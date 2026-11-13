import type { ArticleSummary } from "@/types";
import { ArticleThumbnail } from "./ArticleThumbnail";

export const MonthArticlesContainer = ({ month, articles }: { month: string; articles: ArticleSummary[] }) => {
  const headingId = `month-${month.toLowerCase().replace(/\s+/g, "-")}`; // "month-november-2026"

  return (
    <section aria-labelledby={headingId} className="w-full mb-6">
      <h2 id={headingId} className="text-xl font-semibold text-dark-black leading-none font-stretch-110% mb-4">
        {month}
      </h2>
      <ul role="list" className="w-full grid grid-cols-1 tablet:grid-cols-2 gap-6">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleThumbnail article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
};