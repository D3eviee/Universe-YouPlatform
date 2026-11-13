import "server-only";
import { z } from "zod";
import type { books } from "@/server/schema";
import { CATEGORY_VALUES } from "@/lib/constants/categories";
import { imageKeySchema, storedBlockSchema } from "@/lib/schemas/blocks";
import { slugify } from "@/lib/slugify";
import { parseJsonBody } from "@/server/content/parse";
import { checkOwnImages } from "@/server/content/images";
import { CONTENT_STATUSES } from "@/lib/constants/constants";

type NewBook = typeof books.$inferInsert;

/** What the book editor sends: plain JSON, images already uploaded and referenced by S3 key. */
const bookInputSchema = z
  .object({
    id: z.uuid(),
    title: z.string().trim().min(1, "Title is required").max(200),
    subtitle: z.string().trim().max(500).default(""),
    bookAuthor: z.string().trim().min(1, "Book author is required").max(200),
    category: z.enum(CATEGORY_VALUES, { message: "Choose a category" }),
    status: z.enum(CONTENT_STATUSES),
    bookCover: imageKeySchema.default(""),
    bookCoverAlt: z.string().trim().max(300).default(""),
    bookCoverAnnotation: z.string().trim().max(300).default(""),
    publishedAt: z.coerce.date(),
    blocks: z.array(storedBlockSchema).max(500),
  })
  // Every image must live in this book's own S3 folder
  .superRefine((b, ctx) => checkOwnImages(ctx, "books", b.id, { cover: b.bookCover, blocks: b.blocks }));

/** Validates the request body and returns values ready for db.insert / db.update. */
export async function parseBookRequest(req: Request, authorId: string) {
  const input = await parseJsonBody(req, bookInputSchema);
  return {
    ...input,
    authorId,
    slug: slugify(input.title) || input.id, // a title like "!!!" would give an empty slug
  } satisfies NewBook;
}