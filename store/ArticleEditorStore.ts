import type { Article as DBArticle } from "@/server/schema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createEmptyBlock } from "@/lib/editor/blocks";
import { BlockType, EditorBlock } from "@/lib/schemas/blocks";

export type EditorArticle = Omit<DBArticle, "thumbnailImage" | "blocks"> & {
  thumbnailImage: File | string;
  blocks: EditorBlock[];
  isLocalDraft?: boolean;
};

/** A fresh, unsaved article. A function, so every draft gets a new id and the current date. */
export function createEmptyArticle(): EditorArticle {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    authorId: "",
    title: "",
    subtitle: "",
    slug: "",
    category: "",
    status: "draft",
    priority: "normal",
    thumbnailImage: "",
    thumbnailAlt: "",
    thumbnailDescription: "",
    thumbnailAnnotaion: "",
    blocks: [],
    publishedAt: now,
    createdAt: now,
    isLocalDraft: true,
  };
}

type ArticleEditorStore = {
  activeArticle: EditorArticle;
  setActiveArticle: (article: EditorArticle) => void;
  startNewArticle: () => void;
  updateArticleField: <K extends keyof EditorArticle>(field: K, value: EditorArticle[K]) => void;
  addArticleContentBlock: (type: BlockType) => void;
  updateBlockData: (blockId: string, patch: object) => void;
  deleteArticleContentBlock: (blockId: string) => void;
};


const useArticleEditorStore = create<ArticleEditorStore>()(
  immer((set) => ({
    activeArticle: createEmptyArticle(),

    setActiveArticle: (article) => set((s) => { s.activeArticle = article; }),
    startNewArticle: () => set((s) => { s.activeArticle = createEmptyArticle(); }),

    updateArticleField: (field, value) => set((s) => { s.activeArticle[field] = value; }),

    addArticleContentBlock: (type) => set((s) => { s.activeArticle.blocks.push(createEmptyBlock(type)); }),

    updateBlockData: (blockId, patch) => set((s) => {
      const block = s.activeArticle.blocks.find((b) => b.id === blockId);
      if (block) Object.assign(block.data, patch);
    }),

    deleteArticleContentBlock: (blockId) => set((s) => {
      s.activeArticle.blocks = s.activeArticle.blocks.filter((b) => b.id !== blockId);
    }),
  })),
);

export default useArticleEditorStore;