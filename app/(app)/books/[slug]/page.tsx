import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/client/renderer/BlockRenderer";
import { BookHeader } from "@/components/client/books/BookHeader";
import { BookHeaderImage } from "@/components/client/books/BookHeaderImage";
import { MoreContentCta } from "@/components/ui/MoreContentCta";
import { imageUrl } from "@/lib/image-url";
import { getSingleBook } from "@/server/queries/books";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

// generateMetadata and the page both need the book: one query per request
const getBook = cache(getSingleBook);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) return { title: "Book not found" };

  const image = imageUrl(book.bookCover);
  return {
    title: `${book.title} by ${book.bookAuthor}`,
    description: book.subtitle || undefined,
    openGraph: {
      title: book.title,
      description: book.subtitle || undefined,
      type: "article",
      publishedTime: book.publishedAt.toISOString(),
      images: image ? [{ url: image, alt: book.bookCoverAlt || book.title }] : undefined,
    },
  };
}

export default async function SingleBookPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) notFound();

  return (
    <article className="w-full flex flex-col">
      <BookHeader
        category={book.category}
        title={book.title}
        subtitle={book.subtitle}
        bookAuthor={book.bookAuthor}
        publishedAt={book.publishedAt}
      />
      <BookHeaderImage
        coverKey={book.bookCover}
        alt={book.bookCoverAlt || `Cover of ${book.title}`}
        annotation={book.bookCoverAnnotation}
      />
      <BlockRenderer blocks={book.blocks} />
      <MoreContentCta />
    </article>
  );
}