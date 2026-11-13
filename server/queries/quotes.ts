import { db } from "@/server/db";
import { quotes } from "@/server/schema";
import { asc, sql } from "drizzle-orm";

export async function getDailyQuote() {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(quotes);
  if (!count) return null;

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" });
  const dayNumber = Math.floor(Date.parse(today) / 86_400_000);

  const [quote] = await db
    .select({ quote: quotes.quote, author: quotes.author, source: quotes.source })
    .from(quotes)
    .orderBy(asc(quotes.createdAt), asc(quotes.id))
    .limit(1)
    .offset(dayNumber % count);

  return quote ?? null;
}