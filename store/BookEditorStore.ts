import { INITIAL_BOOK } from "@/constants/constants";
import { Book as DBBook } from "@/server/schema"
import { BlockType, EditorBlock } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type EditorBook = Omit<DBBook, 'bookCover'> & {
  isLocalDraft?: boolean;
  bookCover: File | string | null; 
};

export type BookEditorStore = {
    activeBook: EditorBook,
    setActiveBook: (book: EditorBook) => void
    addBookContentBlock: (t: BlockType) => void
    updateBlockData:(blockId: string, newData: any) => void
    deleteBookContentBlock: (id: string) => void
    updateBookField: <K extends keyof EditorBook>(field: K, value: EditorBook[K]) => void;
}

const useBookEditorStore = create<BookEditorStore>()(immer((set) => ({
    activeBook: INITIAL_BOOK,

    setActiveBook: (book) => set((state) => {
        if(book == undefined) return 
        state.activeBook = book
    }),

    updateBookField: (field, value) => set((state) => {
        if (!state.activeBook) return;
        state.activeBook[field] = value;
    }),

    deleteBookContentBlock: (blockId) => set((state) => {
        state.activeBook.blocks = state.activeBook.blocks.filter((block:EditorBlock) => block.id != blockId)
    }),
    
    updateBlockData: (blockId, newData) => set((state) => {
        if (!state.activeBook || !state.activeBook.blocks) return;
        const block = state.activeBook.blocks.find((item:EditorBlock) => item.id === blockId);
        if (block) block.data = { ...block.data, ...newData };
    }),

    addBookContentBlock: (type:BlockType) => set((state) => {
            if (!state.activeBook) return; 
            if (!state.activeBook.blocks) state.activeBook.blocks = [];
            let newBlock: EditorBlock | null;
    
            if (type === "paragraph") {
                newBlock = { id: crypto.randomUUID(), type: "paragraph",  data: { text: "" } };
            }
            else if  (type === "heading") {
                newBlock = { id: crypto.randomUUID(), type: "heading",  data: { text: "" } };
            }
            else if  (type === "image") {
                newBlock = { id: crypto.randomUUID(), type: "image",  data: { imageSource: "", imageDescription: "", imageAlt: "", imageUrl: ""  } };
            }
            else if  (type === "highlight") {
                newBlock = { id: crypto.randomUUID(), type: "highlight",  data: { text: "" } };
            }
            else if  (type === "quote") {
                newBlock = { id: crypto.randomUUID(), type: "quote",  data: { quote: "", quoteAuthor: "", authorRole: "" } };
            }
            else if  (type === "equation") {
                newBlock = { id: crypto.randomUUID(), type: "equation" ,  data: { equationExpression: "", equationCaption: "" } };
            }
            else{
                newBlock = { id: crypto.randomUUID(), type: "paragraph",  data: { text: "" } };
            }
    
            if (newBlock) state.activeBook.blocks.push(newBlock);
        }), 
})))

export default useBookEditorStore;