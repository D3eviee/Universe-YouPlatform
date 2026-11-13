import { Hero } from "@/components/client/home/Hero";
import { Books } from "@/components/client/home/Books";
import { Latest } from "@/components/client/home/Latest";
import { Quote } from "@/components/client/home/Quote";
import { getHeroArticles } from "@/server/queries/articles";
import { getDailyQuote } from "@/server/queries/quotes";

export const revalidate = 300;

export default async function Home() {  
  const [heroArticles, quote] = await Promise.all([getHeroArticles(), getDailyQuote()]);

  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      <Hero articles={heroArticles} />
      {quote !== null && <Quote quote={quote} />}
      <Latest />
      <Books />
    </div>
  );
}