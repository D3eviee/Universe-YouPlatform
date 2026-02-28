import { Article } from "@/types"

const MOCKUP_ARTICLES: Article[] = [
        {
            id: crypto.randomUUID(),
            title: "",
            subtitle: "",
            authorId: 1,
            thumbnailImg: null,
            thumbnailAlt: "",
            thumbnailDesc: "",
            thumbnailAnnotaion: "",
            priority: "normal",
            publishedAt: new Date(),
            status: "draft",
            category: "science-and-tech",
            blocks: [],
        }
    ]

export { MOCKUP_ARTICLES }
