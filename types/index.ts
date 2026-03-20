import { Article, Quote } from "@/server/schema";

export type BlockType = "heading" | "paragraph" | "image" |  "equation" | "highlight" | "quote" 

export type EditorBlock = { id: string } & (
	| { type: 'highlight'; data: { text: string } }
	| { type: 'paragraph'; data: { text: string } }
  | { type: 'heading'; data: { text: string } }
	| { type: 'image'; data: { imageSource: string; imageDescription: string; imageAlt: string; imageUrl: string; imageFile: File } }
	| { type: 'quote'; data: { quote: string; quoteAuthor: string, authorRole: string } }
	| { type: 'equation'; data: { equationExpression: string; equationCaption: string } }
    // | { type: 'list'; data: { expression: string; caption: string } }
    // | { type: 'callapsable'; data: { expression: string; caption: string } }
)

export type EditorArticle = Article & {
  isLocalDraft?: boolean;
};

export type EditorQuote = Quote & {
  isLocalDraft?: boolean;
};

export type ArticleThumbnail = {
  id: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  thumbnailDescription: string;
  thumbnailAnnotaion: string;
  thumbnailAlt: string;
  category: string | null;
  publishedAt: Date;
}


export type BookThumbnail = {
  id: string,
  title: string;
  slug: string;
  bookAuthor: string,
  bookCoverAlt:string,
  bookCover:string,
  category: string | null;
  publishedAt: Date;
}