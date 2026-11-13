'use client';
import useQuoteStore from "@/store/QuoteStore";
import { useDashboardQuotes } from "./useDashboardQuotes";

/** True when the editor matches what's in the database. */
export const useIsQuoteSaved = () => {
  const active = useQuoteStore((s) => s.activeQuote);
  const { data: quotes } = useDashboardQuotes();

  if (!active) return true;
  if (active.id === null) return false; // a draft is never "saved"

  const original = quotes?.find((q) => q.id === active.id);
  if (!original) return false;

  return original.quote === active.quote && original.author === active.author && original.source === active.source;
};