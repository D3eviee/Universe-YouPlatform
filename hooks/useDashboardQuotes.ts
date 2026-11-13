import { useQuery } from "@tanstack/react-query";
import type { Quote } from "@/server/schema";

async function fetchQuotes(): Promise<Quote[]> {
  const res = await fetch("/api/dashboard/quotes");
  if (!res.ok) throw new Error("Couldn't load quotes");

  const rows: Quote[] = await res.json();
  return rows.map((q) => ({ ...q, createdAt: new Date(q.createdAt) }));
}

export const useDashboardQuotes = () =>
  useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });