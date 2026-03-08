import Books from "@/components/Books";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import Quote from "@/components/Quote";
import { db } from "@/server/db"; 
import { or } from "drizzle-orm";

export default async function Home() {  
const heroArticles = await db.query.articles.findMany({
    where: (table, { eq, and,  }) => and(
      eq(table.status, "public"),
      or(
        eq(table.priority, "hero1",),
        eq(table.priority, "hero2"),
        eq(table.priority, "hero3"),
      )
    ),
    columns: {
      id:true,
      slug: true,
      title: true,
      thumbnailAlt: true,
      thumbnailImage: true,
      priority: true,
      category: true,
      publishedAt: true,
    },
  })
  
  return (
    <div className="flex flex-col gap-2 h-full w-full overflow-x-hidden">
      <Hero articles={heroArticles}/>
      <Quote/>
      <Latest />
      <Books/>
    </div>
  );
}

