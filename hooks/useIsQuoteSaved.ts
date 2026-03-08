'use client'
import { Quote } from "@/server/schema"
import useQuoteStore from "@/store/QuoteStore"
import { useDashboardQuotes } from "./useDashboardQuotes"

export const useIsQuoteSaved = () => {
    const activeQuote = useQuoteStore(store => store.activeQuote)
    const { data: quotes } = useDashboardQuotes()

    if (!activeQuote) return true;
    if ((activeQuote as any).isLocalDraft) return false;

    const originalQuote = quotes?.find((q:Quote) => q.id === activeQuote.id);
    if (!originalQuote) return false;

    return JSON.stringify(activeQuote) === JSON.stringify(originalQuote);
}