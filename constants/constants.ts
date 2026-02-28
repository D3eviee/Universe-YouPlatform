import { Article } from "@/server/schema"

const MOCKUP_ARTICLE: Article = {
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
}
export { MOCKUP_ARTICLE }
