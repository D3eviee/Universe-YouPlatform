import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Quote } from "@/server/schema";
import useQuoteStore, { toDraft, type QuoteDraft } from "@/store/QuoteStore";

export const useSaveQuote = () => {
  const queryClient = useQueryClient()
  const selectQuote = useQuoteStore((s) => s.selectQuote);

  return useMutation({
    mutationFn: async (draft: QuoteDraft): Promise<Quote> => {
      const isNew = draft.id === null;
      const res = await fetch("/api/dashboard/quotes", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? { quote: draft.quote, author: draft.author, source: draft.source } : draft),
      })
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Couldn't save the quote");
      return { ...json, createdAt: new Date(json.createdAt) };
    },
    onSuccess: (saved) => {
      // Put the saved row into the list right away (no "Edited" flash), then refetch to be sure
      queryClient.setQueryData<Quote[]>(["quotes"], (old = []) =>
        old.some((q) => q.id === saved.id) ? old.map((q) => (q.id === saved.id ? saved : q)) : [saved, ...old],
      );
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      selectQuote(toDraft(saved)); // the draft becomes the real quote
    },
    onError: (error) => {
      console.error("Error occured while saving quote:", error);
      alert("Error saving quote");
    }
  })
};