import ArticleThumbnail from "./ArticleThumbnail"
import GoToButton from "./GoToButton"
import { getLatestArticles } from "@/server/queries/articles"


function chunkArray<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const Latest = async () => {
  const latestArticles = await getLatestArticles()

  return (
    <section className="w-full flex flex-col p-8 bg-[#F2F2F5]">
      <div className="me-auto ms-auto ">
        <h2 className="text-2xl font-bold tracking-tight mb-8">More from the Universe</h2>

        <ul className="flex flex-col flex-wrap divide-y  divide-[#C5C5C5] laptop:flex-row  laptop:flex-wrap tablet:w-172 laptop:w-242 " >
          {latestArticles.map(article => <ArticleThumbnail key={article.id} article={article}/>)}
        </ul>

         <GoToButton label="View all" to="/articles" styles="bg-[#E2E2E9]"/>
      </div>

    </section>
  )
}

export default Latest