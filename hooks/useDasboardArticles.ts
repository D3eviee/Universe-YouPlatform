import { useQuery } from "@tanstack/react-query"; 

const fetchArticles = async () => {
  const response = await fetch("/api/dashboard/articles");
  if (!response.ok) throw new Error("Wystąpił błąd podczas pobierania danych z serwera")

  const rawData = await response.json();

  return rawData.map((item: any) => ({
    ...item,
    publishedAt: new Date(item.publishedAt),
    createdAt: new Date(item.createdAt),
  }));
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 10,
  });
};