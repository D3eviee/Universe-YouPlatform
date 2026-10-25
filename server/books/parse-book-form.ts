import "server-only";
import { z } from "zod";
import type { books } from "@/server/schema";
import { CONTENT_STATUSES } from "@/lib/constants/constants";
import { blocksField, parseFields } from "../content/form";
import { slugify } from "@/lib/form-utils";
import { uploadFormFiles } from "../content/images";

type NewBook = typeof books.$inferInsert;

const bookFormSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1, "Title is required").max(200),
  subtitle: z.string().trim().max(500).default(""),
  bookAuthor: z.string().trim().min(1, "Book author is required").max(200),
  category: z.string().trim().min(1, "Category is required").max(50), // NOT NULL in the DB
  status: z.enum(CONTENT_STATUSES),
  bookCoverAlt: z.string().trim().max(300).default(""),
  bookCoverAnnotation: z.string().trim().max(300).default(""),
  publishedAt: z.coerce.date(),
  blocks: blocksField,
});

/**
 * Validates the book form, uploads its images, and returns values ready for
 * db.insert / db.update, plus the S3 keys that were uploaded.
 * If the DB write fails afterwards, call deleteFromS3(uploadedKeys).
 */
export async function parseBookForm(formData: FormData, authorId: string) {
  const fields = parseFields(formData, bookFormSchema);

  const { coverKey, blocks, uploadedKeys } = await uploadFormFiles({
    formData,
    coverField: "bookCover",
    blocks: fields.blocks,
    folder: "books",
    entityId: fields.id,
  });

  const values = {
    ...fields,
    authorId,
    slug: slugify(fields.title) || fields.id,
    blocks,
    // KEEPS THE EXISTING COVER ON UPDATE WHEN NO NEW FILE WAS SENT
    ...(coverKey ? { bookCover: coverKey } : {}),
  } satisfies NewBook;

  return { values, uploadedKeys };
}