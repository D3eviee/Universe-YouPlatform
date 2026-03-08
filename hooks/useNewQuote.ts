import { Quote } from "@/server/schema";
import useQuoteStore from "@/store/QuoteStore";
import { EditorQuote } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export const useNewQuote = () => {
  const queryClient = useQueryClient()
  const setActiveQuote = useQuoteStore(store => store.setActiveQuote)

  return () => {
    const newQuote:EditorQuote = {
      id: 0,
      author: "",
      quote: "",
      source: "",
      createdAt: new Date(),
      isLocalDraft: true, 
    }  

    queryClient.setQueryData(["quotes"], (oldQuote: Quote[]) => {
      return oldQuote ? [newQuote, ...oldQuote] : [oldQuote];
    })
    setActiveQuote(newQuote)
  }
};