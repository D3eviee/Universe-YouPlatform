import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";
import { CategoryBadge } from "../shared/CategoryBadge";
import { BookSummary } from "@/types";

type BookCardProps = {
  book: BookSummary;
  /** Heading level for the title: "h2" on the /books page, "h3" inside a homepage section. */
  titleAs?: "h2" | "h3";
};

const SIZES = "(min-width: 1024px) 320px, (min-width: 768px) 340px, 100vw";

export const BookCard = ({ book, titleAs: Title = "h2" }: BookCardProps) => {
  const src = imageUrl(book.bookCover);

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group h-full flex flex-col overflow-hidden rounded-3xl bg-white border border-light-gray shadow-sm transform-gpu isolate transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-black"
    >
      <div className="relative w-full h-56 shrink-0 overflow-hidden bg-light-gray">
        {src && (
          <>
            {/* Blurred copy fills the box behind the cover */}
            <Image src={src} alt="" aria-hidden fill sizes={SIZES} quality={30} className="object-cover blur-3xl scale-110" />
            <Image
              src={src}
              alt=""
              fill
              sizes={SIZES}
              className="z-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <CategoryBadge value={book.category} variant="color" />
        <Title className="text-dark-black leading-6.5 font-semibold text-xl tablet:text-2xl line-clamp-2">{book.title}</Title>
        <p className="mt-auto pt-3 text-light-black font-medium text-sm tracking-wider">{book.bookAuthor}</p>
      </div>
    </Link>
  );
};