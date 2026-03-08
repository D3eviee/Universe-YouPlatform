import { Quote } from "@/server/schema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type QuoteStore = {
  activeQuote: Quote | null;
  setActiveQuote: (quote: Quote | null) => void;
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt'>) => void;
  updateQuoteField: <K extends keyof Quote>( field: K, value: Quote[K] ) => void;
};

const useQuoteStore = create<QuoteStore>()(immer((set) => ({
  activeQuote: null,

  setActiveQuote: (quote) => set((state) => {
    state.activeQuote = quote;
  }),

  addQuote: (quoteData) => set((state) => {
    const newQuote: Quote = {
      id: 1,
      ...quoteData,
      createdAt: new Date(),
    };
    if (!state.activeQuote) state.activeQuote = newQuote;
  }),

  updateQuoteField: (field, value) => set((state) => {
        if (!state.activeQuote) return;
        state.activeQuote[field] = value;
    }),
})));

export default useQuoteStore;