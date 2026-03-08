'use client'
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved"
import { useSaveQuote } from "@/hooks/useSaveQuote"
import useQuoteStore from "@/store/QuoteStore"
import { Oval } from "react-loader-spinner"

const QuoteSaveButton = () => {
    const activeQuote = useQuoteStore(store => store.activeQuote)
    const isSaved = useIsQuoteSaved()
    const {mutate, isPending} = useSaveQuote()
    
    const handleSave = async () => {
        if (!activeQuote) return;
        const { id, quote, author, source } = activeQuote;

        if(!quote.trim() || !author.trim()) {
            console.warn("Quote and author are required!");
            return;
        }
        
        const isNewDraft = (activeQuote as any).isLocalDraft === true;
        const httpMethod = isNewDraft ? "POST" : "PUT";
        mutate({ method: httpMethod,  data:{ quote, author, source, id}});
    }

    return (
        <button 
            onClick={handleSave}
            type="button"
            disabled={isSaved || isPending} 
            className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
            { isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5}/> : "Save" }
        </button>
  )
}

export default QuoteSaveButton