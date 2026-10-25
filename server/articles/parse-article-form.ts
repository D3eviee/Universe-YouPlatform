import "server-only";
import { z } from "zod";
import type { articles } from "@/server/schema";
import { assertImage, deleteFromS3, uploadToS3 } from "@/server/s3";
import { incomingBlockSchema, type StoredBlock } from "@/lib/schemas/blocks";
import { ARTICLE_PRIORITIES, ARTICLE_STATUSES } from "@/lib/constants/constants";
import { isFile, slugify, textField } from "@/lib/form-utils";
import { toIssues, ValidationError } from "../errors";

type NewArticle = typeof articles.$inferInsert;

// --- FORM SCHEMA (text fields; files are checked separately) ---
const articleFormSchema = z.object({
    id: z.uuid(),
    title: z.string().trim().min(1, "Title is required").max(200),
    subtitle: z.string().trim().max(500).default(""),
    category: z
        .string()
        .trim()
        .max(50),
        status: z.enum(ARTICLE_STATUSES),
        priority: z.enum(ARTICLE_PRIORITIES),
        thumbnailAlt: z.string().trim().max(300).default(""),
        thumbnailAnnotaion: z.string().trim().max(300).default(""),
        thumbnailDescription: z.string().trim().max(2000).default(""),
        publishedAt: z.coerce.date(),
        blocks: z
            .string()
            .default("[]")
            .transform((s, ctx) => {
                try {
                    return JSON.parse(s) as unknown;
                } catch {
                    ctx.addIssue({ code: "custom", message: "blocks is not valid JSON" });
                    return z.NEVER;
                }
            })
        .pipe(z.array(incomingBlockSchema).max(500)),
});

/* Writes the S3 keys of uploaded files into the matching image/gallery blocks. */
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

/* Block id a file field belongs to: "image-<id>" or "gallery-<id>-<index>". */
const blockIdOf = (fieldName: string) =>
  fieldName.startsWith("image-")
    ? fieldName.slice("image-".length)
    : fieldName.replace(/^gallery-(.+)-\d+$/, "$1");

/* Uploads every file, or none. If any upload fails, the ones that succeeded are deleted */
async function uploadAll(files: [name: string, file: File][], articleId: string) {
  const results = await Promise.allSettled(
    files.map(async ([name, file]) => [name, await uploadToS3(file, "articles", articleId)] as const),
  );

  const succeeded = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
  const failed = results.find((r): r is PromiseRejectedResult => r.status === "rejected");

  if (failed) {
    await deleteFromS3(succeeded.map(([, key]) => key));
    throw failed.reason;
  }
  return Object.fromEntries(succeeded) as Record<string, string>;
}


/**
    Validates the article form, uploads its images, and returns values ready for
    db.insert / db.update, plus the S3 keys that were uploaded. 
**/

export async function parseArticleForm(formData: FormData, authorId: string) {
  // VALIDATE TEXT FIELDS
  const raw = Object.fromEntries( Object.keys(articleFormSchema.shape).map((k) => [k, textField(formData, k)]),);

  const parsed = articleFormSchema.safeParse(raw);
  if (!parsed.success) throw new ValidationError(toIssues(parsed.error));
  const fields = parsed.data;

  // VALIDATE FILES
  const blockIds = new Set(fields.blocks.map((b) => b.id));

  const files: [string, File][] = [...formData.entries()].filter(
    (entry): entry is [string, File] =>
      /^(image|gallery)-/.test(entry[0]) && isFile(entry[1]) && blockIds.has(blockIdOf(entry[0])),
  );
  const thumbnail = formData.get("thumbnailFile");
  if (isFile(thumbnail)) files.push(["thumbnail", thumbnail]);

  const fileIssues = files.flatMap(([name, file]) => {
    const problem = assertImage(file);
    return problem ? [{ path: name, message: problem }] : [];
  });
  if (fileIssues.length) throw new ValidationError(fileIssues);

  // UPLOAD (in parallel, all-or-nothing)
  const { thumbnail: thumbnailImage, ...blockUploads } = await uploadAll(files, fields.id);

  const values = {
    ...fields,
    authorId,
    slug: slugify(fields.title) || fields.id,
    blocks: attachUploadedImages(fields.blocks, blockUploads),
    // KEEPS THE EXISTING THUMBNAIL ON UPDATE WHEN NO NEW FILE WAS SENT
    ...(thumbnailImage ? { thumbnailImage } : {}),
  } satisfies NewArticle;

  const uploadedKeys = [thumbnailImage, ...Object.values(blockUploads)].filter(
    (k): k is string => Boolean(k),
  );
  return { values, uploadedKeys };
}