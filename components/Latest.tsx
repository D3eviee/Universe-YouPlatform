import ArticleThumbnail from "./ArticleThumbnail"
import { db } from "@/server/db"
import GoToButton from "./GoToButton"

const Latest = async () => {
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
    <section className="w-full flex flex-col p-8 bg-[#F2F2F5]">
      <div className="tablet:w-173 me-auto ms-auto laptop:w-245">
        <h2 className="text-2xl font-bold tracking-tight mb-8">More from the Universe</h2>
        <ul className="flex flex-col divide-y gap-8 divide-[#C5C5C5] laptop:flex-row">
          {latestArticles.map(article => <ArticleThumbnail key={article.id} article={article}/>)}
        </ul>

         <GoToButton label="View all" to="/articles" styles="bg-[#E2E2E9]"/>
      </div>

    </section>
  )
}

export default Latest