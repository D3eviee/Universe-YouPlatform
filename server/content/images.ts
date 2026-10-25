import { StoredBlock } from "@/lib/schemas/blocks";
import { assertImage, deleteFromS3, uploadToS3 } from "../s3";
import { ValidationError } from "../errors";
import { isFile } from "./form";

export type Folder = "articles" | "books";

/** Block id a file field belongs to: "image-<id>" or "gallery-<id>-<index>". */
const blockIdOf = (fieldName: string) =>
  fieldName.startsWith("image-")
    ? fieldName.slice("image-".length)
    : fieldName.replace(/^gallery-(.+)-\d+$/, "$1");

/**
 * Collects the cover file and block files, validates all of them, then uploads them.
 * Files that don't belong to any block are ignored. Nothing is uploaded if any file is invalid.
 */
export async function uploadFormFiles(opts: {
  formData: FormData;
  coverField: string;
  blocks: StoredBlock[];
  folder: Folder;
  entityId: string;
}) {
  const { formData, coverField, blocks, folder, entityId } = opts;
  const blockIds = new Set(blocks.map((b) => b.id));

  const files: [string, File][] = [...formData.entries()].filter(
    (entry): entry is [string, File] =>
      /^(image|gallery)-/.test(entry[0]) && isFile(entry[1]) && blockIds.has(blockIdOf(entry[0])),
  );
  const cover = formData.get(coverField);
  if (isFile(cover)) files.push(["cover", cover]);

  // VALIDATE ALL FILES BEFORE UPLOADING ANY
  const issues = files.flatMap(([name, file]) => {
    const problem = assertImage(file);
    return problem ? [{ path: name === "cover" ? coverField : name, message: problem }] : [];
  });
  if (issues.length) throw new ValidationError(issues);

  const { cover: coverKey, ...blockUploads } = await uploadAll(files, folder, entityId);

  return {
    coverKey: coverKey as string | undefined,
    blocks: attachUploadedImages(blocks, blockUploads),
    uploadedKeys: [coverKey, ...Object.values(blockUploads)].filter((k): k is string => Boolean(k)),
  };
}

/**
 * Uploads every file, or none. If any upload fails, the ones that succeeded
 * are deleted again so no orphaned images are left in S3.
 */
async function uploadAll(files: [name: string, file: File][], folder: Folder, entityId: string) {
  const results = await Promise.allSettled(
    files.map(async ([name, file]) => [name, await uploadToS3(file, folder, entityId)] as const),
  );

  const succeeded = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
  const failed = results.find((r): r is PromiseRejectedResult => r.status === "rejected");

  if (failed) {
    await deleteFromS3(succeeded.map(([, key]) => key));
    throw failed.reason;
  }
  return Object.fromEntries(succeeded) as Record<string, string>;
}

/** Writes the S3 keys of uploaded files into the matching image/gallery blocks. */
function attachUploadedImages(blocks: StoredBlock[], uploaded: Record<string, string>): StoredBlock[] {
  return blocks.map((block) => {
    if (block.type === "image") {
      const key = uploaded[`image-${block.id}`];
      return key ? { ...block, data: { ...block.data, imageFile: key } } : block;
    }
    if (block.type === "gallery") {
      const images = block.data.images.map((img, i) => {
        const key = uploaded[`gallery-${block.id}-${i}`];
        return key ? { ...img, imageFile: key } : img;
      });
      return { ...block, data: { ...block.data, images } };
    }
    return block;
  });
}

// --- CLEANUP ---

/**
 * Every S3 key a piece of content points to: the cover plus all image and gallery blocks.
 * Only keys inside this entity's own folder are returned, so cleanup can never touch
 * anything that belongs to another article or book.
 */
export function collectImageKeys(
  folder: Folder,
  entityId: string,
  content: { cover?: string | null; blocks: StoredBlock[] },
): Set<string> {
  const keys = new Set<string>();
  const add = (k: unknown) => {
    if (typeof k === "string" && k.startsWith(`${folder}/${entityId}/`)) keys.add(k);
  };

  add(content.cover);
  for (const block of content.blocks) {
    if (block.type === "image") add(block.data.imageFile);
    if (block.type === "gallery") block.data.images.forEach((img) => add(img.imageFile));
  }
  return keys;
}

/** Keys used before an update that are no longer used after it. */
export const unusedKeys = (before: Set<string>, after: Set<string>) =>
  [...before].filter((k) => !after.has(k));