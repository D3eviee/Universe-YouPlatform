'use client'
import { useIsArticleSaved } from "@/hooks/useIsSavedArticle"

const ToolbarSaveIndicator = () => {
    const isSaved = useIsArticleSaved()

  return (
    <div className="text-gray-400 text-basic mr-4 py-1">
        {isSaved ? "Saved" : "Edited"}
    </div>
  )
}

export default ToolbarSaveIndicator
