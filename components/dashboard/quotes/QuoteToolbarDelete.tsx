'use client';
import { useDeleteQuote } from "@/hooks/useDeleteQuote";
import useQuoteStore from "@/store/QuoteStore";

export const QuoteToolbarDelete = () => {
  const activeQuote = useQuoteStore((s) => s.activeQuote);
  const selectQuote = useQuoteStore((s) => s.selectQuote);
  const { mutate, isPending, error } = useDeleteQuote();

  const handleDelete = () => {
    if (!activeQuote) return;

    // A draft isn't in the database yet: just discard it
    if (activeQuote.id === null) {
      if (confirm("Discard this new quote?")) selectQuote(null);
      return;
    }

    if (!confirm("Are you sure you want to delete this quote?")) return;
    mutate(activeQuote.id);
  };
  
  return (
    <div className="flex items-center gap-2">
      <button 
        type="button"
        onClick={handleDelete}
        disabled={!activeQuote || isPending}
        aria-label={activeQuote?.id === null ? "Discard new quote" : "Delete quote"}
        title={activeQuote?.id === null ? "Discard new quote" : "Delete quote"}
        className="p-1 hover:bg-hover cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5a2 2 0 0 1 4 0" />
          <line x1="4" y1="7" x2="20" y2="7" />
          <path d="M6 7l1.2 12.5a2 2 0 0 0 2 1.5h5.6a2 2 0 0 0 2-1.5L18 7" />
        </svg>
      </button>
    
      {error && <span role="alert" className="text-xs text-red-400">{error.message}</span>}
    </div>
  )
}