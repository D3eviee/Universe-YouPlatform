import type { Article, Book, Quote } from "@/server/schema";

// Hand-written UI types only. Everything else is imported from its source.
export type EditorArticle = Article & { isLocalDraft?: boolean };
export type EditorQuote = Quote & { isLocalDraft?: boolean };
export type ArticleThumbnail = Pick<Article,"id" | "title" | "slug" | "thumbnailImage" | "thumbnailDescription" | "thumbnailAnnotaion" | "thumbnailAlt" | "category" | "publishedAt">;
export type BookThumbnail = Pick<Book, "id" | "title" | "slug" | "bookAuthor" | "bookCoverAlt" | "bookCover" | "category" | "publishedAt">;