import { EditorArticle } from "@/types"

const INITIAL_ARTICLE: EditorArticle = {
    id: crypto.randomUUID(),
    title: "",
    subtitle: "",
    authorId: 1,
    thumbnailImage: "",
    thumbnailAlt: "",
    slug: "",
    thumbnailDescription: "",
    thumbnailAnnotaion: "",
    priority: "normal",
    publishedAt: new Date(),
    status: "draft",
    category: "science-and-tech",
    createdAt: new Date(),
    blocks: [],
    isLocalDraft: true,
}
export { INITIAL_ARTICLE }
