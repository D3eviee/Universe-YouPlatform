import ArticleThumbnail from "@/components/ArticleThumbnail";
import { db } from "@/server/db";

export default async function Articles() {
  const latestArticles = await db.query.articles.findMany({
        where: (table, { eq, and,  }) => and(
          eq(table.status, "public"),
        ),
        columns: {
          id:true,
          slug: true,
          title: true,
          thumbnailAlt: true,
          thumbnailAnnotaion: true,
          thumbnailDescription: true,
          thumbnailImage: true,
          category: true,
          publishedAt: true,
        },
        orderBy: (table, { desc }) => [desc(table.publishedAt)],
        limit: 6,
      })

  return (
    <section className="flex-1 w-full pt-8 pb-10">
      <div className="mx-auto w-[87.5%] max-w-91.5">
        <h2 className="text-[#161618] font-bold text-xl mb-4">February 2026</h2>

        <ul role="list h-full">
          {latestArticles.map(article => (<ArticleThumbnail key={article.id} article={article}/>))}
        </ul>
      </div>
    </section>
  );
}