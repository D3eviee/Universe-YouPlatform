import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Quote } from "@/server/schema";
import useQuoteStore, { toDraft } from "@/store/QuoteStore";

export const useDeleteQuote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/dashboard/quotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Couldn't delete the quote");
    },
    onSuccess: (_, id) => {
      const remaining = (queryClient.getQueryData<Quote[]>(["quotes"]) ?? []).filter((q) => q.id !== id);
      queryClient.setQueryData(["quotes"], remaining);
      queryClient.invalidateQueries({ queryKey: ["quotes"] });

      // If the deleted quote was open, open the next one (or nothing)
      const { activeQuote, selectQuote } = useQuoteStore.getState();
      if (activeQuote?.id === id) selectQuote(remaining[0] ? toDraft(remaining[0]) : null);
    },
    onError: (error) => {
      console.error("Error deleting quote:", error);
      alert("Error deleting quote");
    }
  })
};