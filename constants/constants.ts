import { Article } from "@/types"

const MOCKUP_ARTICLES: Article[] = [
        {
            id: "1",
            title: "",
            subtitle: "",
            author: "Hipolit Roszkowski",
            thumbnailImg: null,
            thumbnailAlt: "",
            thumbnailDesc: "",
            thumbnailAnnotaion: "",
            publishedAt: new Date(),
            priority: "Normal",
            publishedAtTime: new Date(),
            status: "draft",
            category: "Technologia",
            blocks: [],
        }
    ]

const ARTICLES_CATEGORIES = [
    'Sport',
    "Society",
    "Biology",
    "Technology"
]

export { ARTICLES_CATEGORIES, MOCKUP_ARTICLES }
