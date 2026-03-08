import { Book as DBBook } from "@/server/schema"
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type EditorBook = DBBook & {
  isLocalDraft?: boolean;
};

export type BookEditorStore = {
    activeBook: EditorBook | null,
    setActiveBook: (book: DBBook | null) => void
    updateBookField: <K extends keyof EditorBook>(field: K, value: EditorBook[K]) => void;
}

const useBookEditorStore = create<BookEditorStore>()(immer((set) => ({
    activeBook: null,

    setActiveBook: (book) => set((state) => {
        if(book == undefined) return 
        state.activeBook = book
    }),

    updateBookField: (field, value) => set((state) => {
        if (!state.activeBook) return;
        state.activeBook[field] = value;
    }),
})))

export default useBookEditorStore;