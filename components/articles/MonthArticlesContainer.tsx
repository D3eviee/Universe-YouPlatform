import { ArticleThumbnail } from '../ArticleThumbnail';
import { ArticleThumbnail as ArticleThumbnailProps } from "@/types";

export const MonthArticlesContainer = ({month, articles} : {month:string , articles:ArticleThumbnailProps[] }) => {
  return (
    <section className="w-full mb-6">
      <h2 className="text-xl font-semibold text-dark-black leading-none laptop:text-xl font-stretch-110% mb-4">
        {month}
      </h2>
      
      <div className="w-full grid grid-cols-1 tablet:grid-cols-2 gap-6">
        { articles.map((article: ArticleThumbnailProps) => (
          <ArticleThumbnail article={article} key={article.id}/> 
        ))}
      </div>
    </section>
  )
}