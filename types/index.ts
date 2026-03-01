import { Article } from "@/server/schema";

export type BlockType = "paragraph" | "image" |  "equation" | "highlight" | "quote" 

export type EditorBlock = { id: string } & (
	| { type: 'highlight'; data: { text: string } }
	| { type: 'paragraph'; data: { text: string } }
	| { type: 'image'; data: { imageSource: string; imageDescription: string; imageAlt: string; imageFile?: File | null } }
	| { type: 'quote'; data: { quote: string; quoteAuthor: string, authorRole: string } }
	| { type: 'equation'; data: { equationExpression: string; equationCaption: string } }
    // | { type: 'list'; data: { expression: string; caption: string } }
    // | { type: 'callapsable'; data: { expression: string; caption: string } }
)

export type EditorArticle = Article & {
  isLocalDraft?: boolean;
};