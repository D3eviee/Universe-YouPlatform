'use client'
import { useArticles } from "@/hooks/useDasboardArticles"
import { Article } from "@/server/schema"
import useArticleEditorStore from "@/store/ArticleEditorStore"

export const useIsArticleSaved = () => {
    const activeArticle = useArticleEditorStore(store => store.activeArticle)
    const { data: articles } = useArticles()

    if (!activeArticle) return true;
    if ((activeArticle as any).isLocalDraft) return false;

    const originalArticle = articles?.find((a:Article) => a.id === activeArticle.id);
    if (!originalArticle) return false;

    return JSON.stringify(activeArticle) === JSON.stringify(originalArticle);
}