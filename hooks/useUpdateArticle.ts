import { useMutation, useQuery } from "@tanstack/react-query"; 

const fetchArticles = async () => {
  const response = await fetch("/api/dashboard/articles", {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Wystąpił błąd podczas aktualizacji danych")

  const rawData = await response.json();

  return rawData.map((item: any) => ({
    ...item,
    publishedAt: new Date(item.publishedAt),
    createdAt: new Date(item.createdAt),
  }));
};

export const useArticles = (fd: FormData) => {
  return useMutation({
    mutationKey: ["updateArtcile"],
    mutationFn: () => fetchArticles(),
  });
};