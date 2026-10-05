import ArticleThumbnail from '../ArticleThumbnail';
import { ArticleThumbnail as ArticleThumbnailProps } from "@/types";

const MonthArticlesContainer = ({month, articles} : {month:string , articles:ArticleThumbnailProps[] }) => {
  return (
    <section className="w-full mb-12">
      <h2 className="text-xl font-bold text-dark-black  leading-none laptop:text-2xl">{month}</h2>
      <div className="w-full flex flex-col laptop:flex-row laptop:flex-wrap">
        { articles.map((article: ArticleThumbnailProps) => <ArticleThumbnail article={article} key={article.id}/> )}
      </div>
    </section>
  )
}

export default MonthArticlesContainer
