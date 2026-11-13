'use client'
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved";
import useQuoteStore from "@/store/QuoteStore";

export const QuoteToolbarSaveIndicator = () => {
  const hasActive = useQuoteStore((s) => s.activeQuote !== null);
  const isSaved = useIsQuoteSaved();

  if (!hasActive) return null;
  const label = isSaved ? "Saved" : "Unsaved changes";

  return (
    <span aria-live="polite" className="text-gray-400 text-basic mr-4 py-1">{label}</span>
  )
}