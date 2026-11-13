import type { Article, Book, Quote } from "@/server/schema";

// Hand-written UI types only. Everything else is imported from its source.
export type EditorArticle = Article & { isLocalDraft?: boolean };
export type EditorQuote = Quote & { isLocalDraft?: boolean };
export type ArticleThumbnail = Pick<Article,"id" | "title" | "slug" | "thumbnailImage" | "thumbnailDescription" | "thumbnailAnnotaion" | "thumbnailAlt" | "category" | "publishedAt">;
export type BookSummary = Pick<Book, "id" | "slug" | "title" | "bookAuthor" | "bookCover" | "category" | "publishedAt">;
export type ArticleSummary = Pick<Article, "id" | "slug" | "title" | "thumbnailImage" | "thumbnailAlt" | "category" | "publishedAt" >;