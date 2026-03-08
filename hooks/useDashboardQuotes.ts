import { useQuery } from "@tanstack/react-query";

const fetchQuotes = async () => {
  const response = await fetch("/api/dashboard/quotes");
  if (!response.ok) throw new Error("Error fetching quotes from server");

  const rawData = await response.json();

  return rawData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));
};

export const useDashboardQuotes = () => {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: 1000 * 60 * 10,
  });
};