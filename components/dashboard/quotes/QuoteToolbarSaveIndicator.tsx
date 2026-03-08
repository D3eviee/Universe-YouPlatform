'use client'
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved"

const QuoteToolbarSaveIndicator = () => {
  const isSaved = useIsQuoteSaved()

  return (
    <div className="text-gray-400 text-basic mr-4 py-1">{isSaved ? "Saved" : "Edited"}</div>
  )
}

export default QuoteToolbarSaveIndicator
