'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { ToolbarAddBlocks } from "../toolbar/ToolbarAddBlocks"
import { useIsArticleSaved } from "@/hooks/useIsSavedArticle"
import { ToolbarDeleteContentButton } from "../shared/ToolbarDeleteContentButton"
import { ToolbarSaveStatus } from "../shared/ToolbarSaveStatus"
import { ToolbarNewContentButton } from "../shared/ToolbarNewContentButton"

export const ArticleToolbar = () => {
  const article = useArticleEditorStore((s) => s.activeArticle);
  const addBlock = useArticleEditorStore((s) => s.addArticleContentBlock);
  const startNew = useArticleEditorStore((s) => s.startNewArticle);
  const isSaved = useIsArticleSaved();

  return (
    <div className="relative w-full flex flex-row justify-between items-center mb-8">
      <ToolbarDeleteContentButton
        endpoint="/api/dashboard/articles"
        queryKey="articles"
        noun="article"
        id={article.id}
        title={article.title}
        isDraft={!!article.isLocalDraft}
        onDeleted={startNew}
      />
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <ToolbarAddBlocks onAdd={addBlock} />
      </div>
      
      <div className="flex flex-row items-center">
        <ToolbarSaveStatus isDraft={!!article.isLocalDraft} isSaved={isSaved} />
        <ToolbarNewContentButton noun="article" isSaved={isSaved} onCreate={startNew} />
      </div>
    </div>
  )
}