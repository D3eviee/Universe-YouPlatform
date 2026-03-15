import Books from "@/components/Books";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import Quote from "@/components/Quote";
import { getHeroArticles } from "@/server/queries/articles";
import { getLatestBooks } from "@/server/queries/books";

export default async function Home() {  
  const latestBooks = await getLatestBooks()
  const heroArticles = await getHeroArticles()

  return (
    <div className="flex flex-col gap-2 h-full w-full overflow-x-hidden">
      <Hero articles={heroArticles}/>
      <Quote/>
      <Latest />
      <Books books={latestBooks}/>
    </div>
  );
}

