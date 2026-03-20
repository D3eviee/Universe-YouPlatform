import Books from "@/components/Books";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import Quote from "@/components/Quote";
import { getHeroArticles } from "@/server/queries/articles";
import { getDailyQuote } from "@/server/queries/quotes";

export default async function Home() {  
  const heroArticles = await getHeroArticles()
  const quote = await getDailyQuote()

  return (
    <div className="flex flex-col  h-full w-full overflow-x-hidden">
      <Hero articles={heroArticles} />
      <Quote quote={quote} />
      <Latest />
      <Books />
    </div>
  );
}

