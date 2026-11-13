'use client'
import { useState } from "react";
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved"
import { useSaveQuote } from "@/hooks/useSaveQuote"
import useQuoteStore from "@/store/QuoteStore"
import { Oval } from "react-loader-spinner"

export const QuoteSaveButton = () => {
    const activeQuote = useQuoteStore((s) => s.activeQuote);
    const isSaved = useIsQuoteSaved()
    const { mutate, isPending, error, reset } = useSaveQuote();
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSave = () => {
        if (!activeQuote) return;
        reset();
        
        const draft = {
            ...activeQuote,
            quote: activeQuote.quote.trim(),
            author: activeQuote.author.trim(),
            source: activeQuote.source.trim(),
        };
        
        if (!draft.quote || !draft.author) {
            setLocalError("Quote and author are required.");
            return;
        }

        setLocalError(null);
        mutate(draft);
    };
    
    const message = localError ?? error?.message;

    return (
        <div className="flex flex-col gap-2">
            {message && <p role="alert" className="text-sm text-red-400">{message}</p>}
            <button
                type="button"
                onClick={handleSave}
                disabled={isSaved || isPending}
                className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5} /> : "Save"}
            </button>
        </div>
  )
}