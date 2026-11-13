import { format } from "date-fns";
import { getCategory } from "@/lib/constants/categories";
import { SaveArticleButton } from "./SaveArticleButton";

type ArticleHeaderProps = {
  articleId: string;
  isSaved: boolean;
  slug: string;
  category: string | null;
  title: string;
  subtitle: string;
  publishedAt: Date;
  isLoggedIn: boolean;
};

export const ArticleHeader = ({ articleId, isSaved, slug, category, title, subtitle, publishedAt, isLoggedIn }: ArticleHeaderProps) => {
  const categoryLabel = getCategory(category)?.label;

  return (
    <header className="px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto mt-10 laptop:mt-13">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-0.5">
          {categoryLabel && (
            <p className="text-xxs font-bold text-dark-gray uppercase tracking-wider">{categoryLabel}</p>
          )}
          <time dateTime={publishedAt.toISOString()} className="text-14 font-medium text-dark-gray">
            {format(publishedAt, "MMMM d, y")}
          </time>
        </div>
        <SaveArticleButton articleId={articleId} initialIsSaved={isSaved} slug={slug} isLoggedIn={isLoggedIn} />
      </div>

      <h1 className="my-4 tablet:my-6 text-3xl tablet:text-5xl tablet:leading-13 font-bold text-dark-black">{title}</h1>
      {subtitle && (
        <p className="text-xl text-dark-black tablet:font-medium tracking-[0.015em] leading-7 mb-8 tablet:mb-12">{subtitle}</p>
      )}
    </header>
  );
};