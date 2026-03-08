import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveQuote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ method, data }:{ method: string, data: any }) => {
      const response = await fetch("/api/dashboard/quotes", {            
        method: method, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error("Error occured while saving quote");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (error) => {
      console.error("Error occured while saving quote:", error);
      alert("Error saving quote");
    }
  })
};