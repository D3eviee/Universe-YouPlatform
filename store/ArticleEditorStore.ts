import { Article as DBArticle } from "@/server/schema"
import { INITIAL_ARTICLE } from "@/constants/constants";
import { EditorArticle, EditorBlock } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type BlockType = "heading" | "paragraph" | "image" | "quote" | "highlight" | "equation" | "sources" | "gallery" | "lab" | "lab-predefined"

export type ArticleEditorStore = {
    activeArticle: EditorArticle;
    setActiveArticle: (a: DBArticle) => void;
    addArticleContentBlock: (t: BlockType) => void;
    deleteArticleContentBlock: (id: string) => void;
    updateArticleField: <K extends keyof EditorArticle>(field: K, value: EditorArticle[K]) => void;
    updateBlockData: (blockId: string, newData: any) => void;

    // SELECTION TRACKER
    activeSelectionBlockId: string | null;
    setActiveSelectionBlockId: (id: string | null) => void;
}

const useArticleEditorStore = create<ArticleEditorStore>()(immer((set) => ({
    activeArticle: INITIAL_ARTICLE,
    activeSelectionBlockId: null,

    setActiveSelectionBlockId: (id) => set((state) => {
        state.activeSelectionBlockId = id;
    }),

    setActiveArticle: (article) => set((state) => {
        if (!article) return; 
        state.activeArticle = article;
    }),

    addArticleContentBlock: (type: BlockType) => set((state) => {
        if (!state.activeArticle) return; 
        if (!state.activeArticle.blocks) state.activeArticle.blocks = [];
        
        const baseBlock = { id: crypto.randomUUID(), type };
        let data: any;

        // --- ADDS SELECTED TYPE OF BLOCK
        switch (type) {
            case "heading":
            case "paragraph":
            case "highlight":
                data = { text: "" };
                break;
            case "image":
                data = { imageSource: "", imageDescription: "", imageAlt: "", imageFile: null };
                break;
            case "quote":
                data = { quote: "", quoteAuthor: "", authorRole: "" };
                break;
            case "equation":
                data = { equationExpression: "", equationCaption: "" };
                break;
            case "sources":
                data = { sources: [] };
                break;
            case "gallery":
                data = { images: [{ imageSource: "", imageDescription: "", imageAlt: "", imageFile: null }] };
                break;
            case "lab":
                data = { moduleName: "ProportionalDotGrid", props: { 
                    title: "",
                    description: "",
                    baseName: "",
                    alloyName: "",
                    baseColor: "#FFF",
                    alloyColor: "#FFF",
                    metricName: "",
                    metricUnit: "",
                    maxPercentage: null,
                    baseValue: null,
                    maxValue: null,
                    mathMode: "linear",
                }}
                break
            case "lab-predefined":
                data = { moduleName: "" }
                break
            default:
                // FALLBACK
                baseBlock.type = "paragraph"; 
                data = { text: "" };
                break;
        }

        state.activeArticle.blocks.push({ ...baseBlock, data } as EditorBlock);
    }), 

    deleteArticleContentBlock: (blockId) => set((state) => {
        if (!state.activeArticle?.blocks) return;
        state.activeArticle.blocks = state.activeArticle.blocks.filter((block) => block.id !== blockId);
    }),

    updateArticleField: (field, value) => set((state) => {
        if (!state.activeArticle) return;
        state.activeArticle[field] = value;
    }),

    updateBlockData: (blockId, newData) => set((state) => {
        if (!state.activeArticle?.blocks) return;
        const block = state.activeArticle.blocks.find((item) => item.id === blockId);
        if (block) {
            block.data = { ...block.data, ...newData };
        }
    }),
})));

export default useArticleEditorStore;