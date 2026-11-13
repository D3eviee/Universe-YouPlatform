import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/types";
import { imageUrl } from "@/lib/image-url";
import { CategoryBadge } from "../shared/CategoryBadge";
import { format } from "date-fns";

export const ArticleThumbnail = ({ article }: { article: ArticleSummary }) => {
  const src = imageUrl(article.thumbnailImage);

  return (
    <Link href={`/articles/${article.slug}`} className="group w-full flex flex-row py-7 laptop:pr-14">
      <div className="relative thumbnail-image shrink-0 overflow-hidden bg-light-gray">
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 200px, 120px"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        )}
      </div>

      <div className="w-full flex flex-col justify-center pl-4 laptop:pl-7">
        <CategoryBadge value={article.category} />
        <h3 className="text-dark-black leading-6.5 font-semibold text-xl tablet:text-2xl">{article.title}</h3>
        <time dateTime={article.publishedAt.toISOString()} className="text-light-black mt-2 font-medium text-sm tracking-wider">
          {format(article.publishedAt, "MMMM d, y")}
        </time>
      </div>
    </Link>
  );
};