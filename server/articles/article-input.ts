import "server-only";
import { z } from "zod";
import type { articles } from "@/server/schema";
import { ARTICLE_PRIORITIES, CONTENT_STATUSES } from "@/lib/constants/constants";
import { imageKeySchema, storedBlockSchema } from "@/lib/schemas/blocks";
import { slugify } from "@/lib/slugify";
import { parseJsonBody } from "@/server/content/parse";
import { checkOwnImages } from "@/server/content/images";

type NewArticle = typeof articles.$inferInsert;

/** Editor sends plain JSON with images uploaded and referenced by key. */
const articleInputSchema = z
  .object({
    id: z.uuid(),
    title: z.string().trim().min(1, "Title is required").max(200),
    subtitle: z.string().trim().max(500).default(""),
    category: z.string().trim().min(1, "Category is required").max(50),
    status: z.enum(CONTENT_STATUSES),
    priority: z.enum(ARTICLE_PRIORITIES),
    thumbnailImage: imageKeySchema.default(""),
    thumbnailAlt: z.string().trim().max(200).default(""),
    thumbnailAnnotaion: z.string().trim().max(200).default(""),
    thumbnailDescription: z.string().trim().max(200).default(""),
    publishedAt: z.coerce.date(),
    blocks: z.array(storedBlockSchema).max(500),
  })
  .superRefine((a, ctx) =>
    checkOwnImages(ctx, "articles", a.id, { cover: a.thumbnailImage, blocks: a.blocks }),
  );

/** Validates the request body and returns values ready for db action */
export async function parseArticleRequest(req: Request, authorId: string) {
  const input = await parseJsonBody(req, articleInputSchema);
  return { ...input, authorId, slug: slugify(input.title) || input.id } satisfies NewArticle;
}
