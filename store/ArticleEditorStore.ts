import { Article as DBArticle } from "@/server/schema"
import { INITIAL_ARTICLE } from "@/constants/constants";
import { EditorArticle, EditorBlock } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


type BlockType = "paragraph" | "image" | "quote" | "highlight" | "equation"


export type ArticleEditorStore = {
    activeArticle: EditorArticle,
    setActiveArticle: (a:DBArticle) => void
    addArticleContentBlock: (t: BlockType) => void
    deleteArticleContentBlock: (id: string) => void
    updateArticleField: <K extends keyof EditorArticle>( field: K, value: EditorArticle[K] ) => void;
    updateBlockData:(blockId: string, newData: any) => void
}

const useArticleEditorStore = create<ArticleEditorStore>()(immer((set) => ({
    activeArticle: INITIAL_ARTICLE,

    setActiveArticle: (article) => set((state) => {
        if(article == undefined) return 
        state.activeArticle = article
    }),

    addArticleContentBlock: (type:BlockType) => set((state) => {
        if (!state.activeArticle) return; 
        if (!state.activeArticle.blocks) state.activeArticle.blocks = [];
        let newBlock: EditorBlock | null;

        if (type === "paragraph") {
            newBlock = { id: crypto.randomUUID(), type: "paragraph",  data: { text: "" } };
        }
        else if  (type === "image") {
            newBlock = { id: crypto.randomUUID(), type: "image",  data: { imageSource: "", imageDescription: "", imageAlt: "", imageFile: null  } };
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

        if (newBlock) state.activeArticle.blocks.push(newBlock);
    }), 

    deleteArticleContentBlock: (blockId) => set((state) => {
        state.activeArticle.blocks = state.activeArticle.blocks.filter((block:EditorBlock) => block.id != blockId)
    }),

    updateArticleField: (field, value) => set((state) => {
        if (!state.activeArticle) return;
        state.activeArticle[field] = value;
    }),

    updateBlockData: (blockId, newData) => set((state) => {
        if (!state.activeArticle || !state.activeArticle.blocks) return;
        const block = state.activeArticle.blocks.find((item:EditorBlock) => item.id === blockId);
        if (block) block.data = { ...block.data, ...newData };
    }),
}))
)

export default useArticleEditorStore;