'use client'
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved";
import useQuoteStore from "@/store/QuoteStore";

export const QuoteToolbarAdd = () => { 

  const startNewQuote = useQuoteStore((s) => s.startNewQuote);
  const isSaved = useIsQuoteSaved();

  const handleAdd = () => {
    if (!isSaved && !confirm("You have unsaved changes. Discard them?")) return;
    startNewQuote();
  };
  
  return (
    <button 
      type="button"
      onClick={handleAdd}
      title="New quote"
      aria-label="New quote"
      className="p-1 hover:bg-hover cursor-pointer rounded-lg"
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  )
}
