import { Quote } from "@/server/schema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/** What the editor works on. id === null means "not saved yet". */
export type QuoteDraft = Pick<Quote, "quote" | "author" | "source"> & { id: string | null };
export const toDraft = (q: Quote): QuoteDraft => ({ id: q.id, quote: q.quote, author: q.author, source: q.source });

const emptyDraft = (): QuoteDraft => ({ id: null, quote: "", author: "", source: "" });

type QuoteStore = {
  activeQuote: QuoteDraft | null;
  selectQuote: (quote: QuoteDraft | null) => void;
  startNewQuote: () => void;
  updateQuoteField: (field: "quote" | "author" | "source", value: string) => void;
};

const useQuoteStore = create<QuoteStore>()(
  immer((set) => ({
    activeQuote: null,
    selectQuote: (quote) => set((s) => { s.activeQuote = quote; }),
    startNewQuote: () => set((s) => { s.activeQuote = emptyDraft(); }),
    updateQuoteField: (field, value) => set((s) => { if (s.activeQuote) s.activeQuote[field] = value; }),
  })),
);

export default useQuoteStore;