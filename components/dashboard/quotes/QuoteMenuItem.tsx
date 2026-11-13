'use client'
import {Quote } from "@/server/schema";
import useQuoteStore from "@/store/QuoteStore";

export const QuoteMenuItem = ({ quote, onSelect }: { quote: Quote; onSelect: () => void }) => {
    // Each item only re-renders when *its own* active state or live text changes
    const isActive = useQuoteStore((s) => s.activeQuote?.id === quote.id);
    const liveQuote = useQuoteStore((s) => (s.activeQuote?.id === quote.id ? s.activeQuote.quote : null));
    const liveAuthor = useQuoteStore((s) => (s.activeQuote?.id === quote.id ? s.activeQuote.author : null));
    
    const text = (isActive ? liveQuote : quote.quote) || "New quote";
    const author = (isActive ? liveAuthor : quote.author) || "New author";
    
    return (
        <button  
            type="button"
            onClick={onSelect}
            aria-current={isActive || undefined}
            className={`flex text-left flex-col gap-1.5 px-7 py-3 rounded-xl sidebar-item-hover ${isActive ? "bg-focus" : "bg-transparent"}`}
        >
            <span className="sidebar-item-header line-clamp-2 leading-6">{text}</span>
            <span className="sidebar-item-details leading-4">{author}</span>
        </button>
    )
}