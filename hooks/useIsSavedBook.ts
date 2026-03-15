'use client'
import { useArticles } from "@/hooks/useDasboardArticles"
import { Article } from "@/server/schema"
import useBookEditorStore from "@/store/BookEditorStore"

export const useIsSavedBook = () => {
    const activeBook = useBookEditorStore(store => store.activeBook)
    const { data: articles } = useArticles()

    if (!activeBook) return true;
    if ((activeBook as any).isLocalDraft) return false;

    const originalArticle = articles?.find((a:Article) => a.id === activeBook.id);
    if (!originalArticle) return false;

    return JSON.stringify(activeBook) === JSON.stringify(originalArticle);
}