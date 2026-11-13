import "server-only";
import type { z } from "zod";
import type { StoredBlock } from "@/lib/schemas/blocks";
import { deleteFromS3, markAsPending, markAsUsed } from "@/server/s3";
import { ValidationError } from "@/server/errors";
import { UploadFolder } from "@/lib/constants/image-uploads";

export type ArticleContentData = { cover?: string | null; blocks: StoredBlock[] };

/** Every non-empty image key in a piece of content: cover, gallery add single photo */
export function allImageKeys(content: ArticleContentData): string[] {
  const keys: string[] = [];
  if (content.cover) keys.push(content.cover);
  for (const block of content.blocks) {
    if (block.type === "image" && block.data.imageFile) keys.push(block.data.imageFile);
    if (block.type === "gallery")
      for (const img of block.data.images) if (img.imageFile) keys.push(img.imageFile);
  }
  return keys;
}

/* Zod refinement: every image must live in this entity's own folder. */
export function checkOwnImages(
  ctx: z.RefinementCtx,
  folder: UploadFolder,
  entityId: string,
  content: ArticleContentData,
) {
  const prefix = `${folder}/${entityId}/`;
  for (const key of allImageKeys(content)) {
    if (!key.startsWith(prefix))
      ctx.addIssue({ code: "custom", path: ["images"], message: `Image ${key} doesn't belong to this item` });
  }
}

const difference = (a: Iterable<string>, b: Set<string>) => [...new Set(a)].filter((k) => !b.has(k));

/**
 * Saves content and keeps S3 in sync with it:
 *  1. images new in this save are confirmed to exist and lose their "pending" tag
 *  2. the DB write runs (`write`)
 *  3. if the write fails, those images get the "pending" tag back (S3 deletes them in a day)
 *  4. if it succeeds, images the content no longer uses are deleted
 */
export async function saveWithImages<Row>(opts: { content: ArticleContentData; before: ArticleContentData | null; write: () => Promise<Row | undefined>; }): Promise<Row | undefined> {
  const newKeys = new Set(allImageKeys(opts.content));
  const oldKeys = new Set(opts.before ? allImageKeys(opts.before) : []);
  const added = difference(newKeys, oldKeys);

  // confirm new images
  const { missing } = await markAsUsed(added);
  if (missing.length) {
    await markAsPending(added.filter((k) => !missing.includes(k)));
    throw new ValidationError(
      missing.map((k) => ({ path: "images", message: `Image ${k} was not uploaded (or expired). Upload it again.` })),
    );
  }

  // 2) WRITE
  let row: Row | undefined;
  try {
    row = await opts.write();
  } catch (error) {
    await markAsPending(added); // 3) roll back
    throw error;
  }
  if (!row) {
    await markAsPending(added);
    return undefined;
  }

  // 4) CLEAN UP
  await deleteFromS3(difference(oldKeys, newKeys));
  return row;
}
