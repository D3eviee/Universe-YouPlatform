import { useQuery } from "@tanstack/react-query";
import type { Book } from "@/server/schema";

async function fetchBooks(): Promise<Book[]> {
  const res = await fetch("/api/dashboard/books");
  if (!res.ok) throw new Error("Couldn't load books");

  const rows: Book[] = await res.json();
  return rows.map((b) => ({
    ...b,
    publishedAt: new Date(b.publishedAt),
    createdAt: new Date(b.createdAt),
  }));
}

export const useDashboardBooks = () => useQuery({ 
  queryKey: ["books"], 
  queryFn: fetchBooks }
);