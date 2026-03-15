import { useQuery } from "@tanstack/react-query";

const fetchBooks = async () => {
  const response = await fetch("/api/dashboard/books");
  if (!response.ok) throw new Error("Error fetching books from server");

  const rawData = await response.json();
  
  if(!rawData) return []

  return rawData.map((item: any) => ({
    ...item,
    publishedAt: new Date(item.publishedAt),
    createdAt: new Date(item.createdAt),
  }));
};

export const useDashboardBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};
