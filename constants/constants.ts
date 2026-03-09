import { EditorBook } from "@/store/BookEditorStore"
import { EditorArticle } from "@/types"

const CATEGORIES_LABELS: {value:string, label:string}[] = [
    {label: "Science & Tech", value: "science-and-tech"},
    {label: "News & Politics", value: "news-and-politics"},
    {label: "Entertainment", value: "entertainment"},
    {label: "Money & Business", value: "money-and-business"},
    {label: "Sport", value: "sport"},
    {label: "Music", value: "music"},
    {label: "History", value: "history"},
    {label: "Health", value: "health"},
    {label: "Cars", value: "cars"},
    {label: "Coding", value: "coding"},
]

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

const INITIAL_BOOK: EditorBook = {
    id: crypto.randomUUID(),
    authorId: 1,
    title: "",
    subtitle: "",
    slug: "",
    bookCover: "",
    bookCoverAlt: "",
    bookAuthor: "",
    publishedAt: new Date(),
    status: "draft",
    bookCoverAnnotation: "",
    category: "science-and-tech",
    createdAt: new Date(),
    blocks: [],
    isLocalDraft: true,
}

export { INITIAL_ARTICLE, CATEGORIES_LABELS, INITIAL_BOOK }
