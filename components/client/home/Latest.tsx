import { ArticleThumbnail } from "../articles/ArticleThumbnail";
import { GoToButton } from "../shared/GoToButton";
import { getLatestArticles } from "@/server/queries/articles";

export const Latest = async () => {
  const articles = await getLatestArticles();
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="stories-heading" className="w-full flex flex-col px-8 py-16 laptop:pt-20 bg-[#F2F2F5]">
      <h2 id="stories-heading" className="section-head">Stories</h2>

      <ul className="w-full mx-auto grid grid-cols-1 tablet:w-172 laptop:w-242 laptop:grid-cols-2 laptop:gap-x-14 divide-y divide-[#C5C5C5] laptop:divide-y-0 [&>li]:laptop:border-b [&>li]:laptop:border-[#C5C5C5] [&>li:nth-last-child(-n+2)]:laptop:border-b-0">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleThumbnail article={article} />
          </li>
        ))}
      </ul>

      <GoToButton label="View all" href="/articles" className="bg-[#E2E2E9]" />
    </section>
  );
};