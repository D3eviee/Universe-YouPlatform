import { MonthArticlesContainer } from "@/components/articles/MonthArticlesContainer";
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

export default async function ArticlesPage() {
  const articles = await getArticles()
  const groupedData = groupArticlesByMonth(articles);

  return (
    <section className="flex-1 w-full flex flex-col px-4 p-12">
        <h2 className="text-3xl font-bold text-dark-black leading-none font-stretch-105% mb-8 tablet:w-172 laptop:w-5xl tablet:mx-auto">Articles</h2>
        <div className="w-full mx-auto flex flex-col flex-wrap tablet:w-172 laptop:w-5xl">
          { groupedData.map(( {month, articles} ) => <MonthArticlesContainer month={month} articles={articles} key={month}/> )}
      </div>
    </section>
  );
}