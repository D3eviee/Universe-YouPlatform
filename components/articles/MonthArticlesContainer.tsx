import ArticleThumbnail from '../ArticleThumbnail';
import { ArticleThumbnail as ArticleThumbnailProps } from "@/types";

const MonthArticlesContainer = ({month, articles} : {month:string , articles:ArticleThumbnailProps[] }) => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-800  leading-none laptop:text-2xl">{month}</h2>
      <div className="flex flex-col laptop:flex-row laptop:flex-wrap">
        { articles.map((article: ArticleThumbnailProps) => <ArticleThumbnail article={article} key={article.id}/> )}
      </div>
    </section>
  )
}

export default MonthArticlesContainer
