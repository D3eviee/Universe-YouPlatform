import { format } from "date-fns";
import { getCategory } from "@/lib/constants/categories";

type BookHeaderProps = {
  category: string;
  title: string;
  subtitle: string;
  bookAuthor: string;
  publishedAt: Date;
};

const column = "w-[86.5%] mx-auto tablet:w-143 laptop:w-162 text-center";

export const BookHeader = ({ category, title, subtitle, bookAuthor, publishedAt }: BookHeaderProps) => {
  const categoryLabel = getCategory(category)?.label;

  return (
    <header className="w-full max-w-103 mx-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13 mb-8">
      {categoryLabel && (
        <p className={`${column} text-xs font-bold uppercase text-dark-gray mb-6`}>{categoryLabel}</p>
      )}

      <h1 className={`${column} text-large font-bold text-dark-black leading-9 mb-2`}>{title}</h1>
      <p className={`${column} text-lg font-medium leading-6.5`}>{bookAuthor}</p>

      {subtitle && <p className={`${column} mt-4 text-light-black`}>{subtitle}</p>}

      <time dateTime={publishedAt.toISOString()} className={`${column} block mt-3 text-sm text-dark-gray`}>
        {format(publishedAt, "MMMM d, y")}
      </time>
    </header>
  );
};