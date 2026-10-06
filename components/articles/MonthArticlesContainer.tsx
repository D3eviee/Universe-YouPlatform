import { ArticleThumbnail } from '../ArticleThumbnail';
import { ArticleThumbnail as ArticleThumbnailProps } from "@/types";

export const MonthArticlesContainer = ({month, articles} : {month:string , articles:ArticleThumbnailProps[] }) => {
  return (
    <section className="w-full mb-6">
      <h2 className="text-xl font-semibold text-dark-black leading-none laptop:text-xl font-stretch-110%">{month}</h2>
      <div className="w-full flex flex-col laptop:flex-row laptop:flex-wrap">
        { articles.map((article: ArticleThumbnailProps) => <ArticleThumbnail article={article} key={article.id}/> )}
      </div>
    </section>
  )
}
