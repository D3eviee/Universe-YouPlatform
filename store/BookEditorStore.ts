import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Book as DBBook } from "@/server/schema";
import type { BlockType, EditorBlock } from "@/lib/schemas/blocks";
import { createEmptyBlock } from "@/lib/editor/blocks";

export type EditorBook = Omit<DBBook, "bookCover" | "blocks"> & {
  bookCover: File | string;
  blocks: EditorBlock[]; // blocks in the editor may still contain Files
  isLocalDraft?: boolean;
};

/** A fresh, unsaved book. A function, so every draft gets a new id and the current date. */
export function createEmptyBook(): EditorBook {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    authorId: "", // set by the server from the session
    title: "",
    subtitle: "",
    slug: "",
    bookAuthor: "",
    category: "",
    status: "draft",
    bookCover: "",
    bookCoverAlt: "",
    bookCoverAnnotation: "",
    blocks: [],
    publishedAt: now,
    createdAt: now,
    isLocalDraft: true,
  };
}

type BookEditorStore = {
  activeBook: EditorBook;

  // WHOLE BOOK
  setActiveBook: (book: EditorBook) => void;
  startNewBook: () => void;

  // FIELDS
  updateBookField: <K extends keyof EditorBook>(field: K, value: EditorBook[K]) => void;

  // BLOCKS
  addBookContentBlock: (type: BlockType) => void;
  updateBlockData: (blockId: string, patch: object) => void;
  deleteBookContentBlock: (blockId: string) => void;
};

const useBookEditorStore = create<BookEditorStore>()(
  immer((set) => ({
    activeBook: createEmptyBook(),

    setActiveBook: (book) => set((s) => { s.activeBook = book; }),

    startNewBook: () => set((s) => { s.activeBook = createEmptyBook(); }),

    updateBookField: (field, value) => set((s) => { s.activeBook[field] = value; }),

    addBookContentBlock: (type) => set((s) => { s.activeBook.blocks.push(createEmptyBlock(type)); }),

    updateBlockData: (blockId, patch) => set((s) => {
      const block = s.activeBook.blocks.find((b) => b.id === blockId);
      if (block) Object.assign(block.data, patch); // merges the changed fields into the draft
    }),

    deleteBookContentBlock: (blockId) => set((s) => {
      s.activeBook.blocks = s.activeBook.blocks.filter((b) => b.id !== blockId);
    }),
  })),
);

export default useBookEditorStore;