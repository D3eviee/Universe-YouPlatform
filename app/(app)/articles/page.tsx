import MonthArticlesContainer from "@/components/articles/MonthArticlesContainer";
import { getArticles } from "@/server/queries/articles";
import { ArticleThumbnail as ArticleThumbnailProps } from "@/types";

const groupArticlesByMonth = (articlesArray: ArticleThumbnailProps[]) => {
  const sortedArticles = [...articlesArray].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const grouped = sortedArticles.reduce<Record<string, ArticleThumbnailProps[]>>((acc, article) => {
    const dateObj = new Date(article.publishedAt);
    
    let monthYearLabel = dateObj.toLocaleDateString('en-EN', { month: 'long', year: 'numeric' });
    
    monthYearLabel = monthYearLabel.charAt(0).toUpperCase() + monthYearLabel.slice(1);


    if (!acc[monthYearLabel]) acc[monthYearLabel] = [];
    acc[monthYearLabel].push(article);
    return acc;
  }, {});

  return Object.entries(grouped).map(([month, articles]) => ({ month, articles }));
};

export default async function Articles() {
  const articles = await getArticles()
  const groupedData = groupArticlesByMonth(articles);

  return (
    <section className="w-full flex flex-col px-8 p-16">
        <div className="me-auto ms-auto flex flex-col flex-wrap  tablet:w-172 laptop:w-242">
          { groupedData.map(( {month, articles} ) => <MonthArticlesContainer month={month} articles={articles} key={month}/> )}
      </div>
    </section>
  );
}