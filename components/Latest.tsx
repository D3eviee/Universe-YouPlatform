import ArticleThumbnail from "./ArticleThumbnail"
import GoToButton from "./GoToButton"
import { getLatestArticles } from "@/server/queries/articles"

const Latest = async () => {
  const latestArticles = await getLatestArticles()

  return (
    <section className="w-full flex flex-col px-8 pt-10 laptop:pt-20 pb-10.5 bg-[#F2F2F5] ">
      <h2 className="section-head">More From The Universe</h2>
      
      <ul className="flex flex-col flex-wrap divide-y me-auto ms-auto divide-[#C5C5C5] tablet:w-172 laptop:w-242 laptop:flex-row laptop:flex-wrap">
        {latestArticles.map(article => <ArticleThumbnail key={article.id} article={article}/>)}
      </ul>

      <GoToButton label="View all" to="/articles" styles="bg-[#E2E2E9]"/>
    </section>
  )
}

export default Latest