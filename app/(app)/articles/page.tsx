import type { Metadata } from "next";
import { format } from "date-fns";
import { MonthArticlesContainer } from "@/components/client/articles/MonthArticlesContainer";
import { getArticles } from "@/server/queries/articles";
import type { ArticleSummary } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articles",
  description: "All articles, newest first.",
};

/** Groups articles (already sorted newest first) by month, in Polish time. */
function groupByMonth(articles: ArticleSummary[]) {
  const groups = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    const month = format(article.publishedAt, "MMMM yyyy");
    const group = groups.get(month);
    if (group) group.push(article);
    else groups.set(month, [article]);
  }
  return [...groups].map(([month, articles]) => ({ month, articles }));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <section className="flex-1 w-full px-4 py-12">
      <div className="w-full mx-auto tablet:w-172 laptop:w-5xl">
        <h1 className="text-3xl font-bold text-dark-black leading-none font-stretch-105% mb-8">Articles</h1>
        
        {articles.length === 0 ? (
          <p className="text-dark-gray">No articles yet. Come back soon.</p>
        ) : (
          groupByMonth(articles).map(({ month, articles }) => (
          <MonthArticlesContainer key={month} month={month} articles={articles} />
        )))}
      </div>
    </section>
  );
}
