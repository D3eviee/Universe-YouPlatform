import ArticleMoreNewsTab from "@/components/articles/ArticleMoreNewsTab";
import BlockRenderer from "@/components/BlockRenderer";
import BookHeader from "@/components/books/BookHeader";
import BookHeaderImage from "@/components/books/BookHeaderImage";
import { getSingleBook } from "@/server/queries/books";
import { notFound } from "next/navigation";

export default async function SingleBookPage({ params }: {params: { slug: string };}) {
  const { slug } = await params; 
  const book = await getSingleBook(slug)

  if (!book) notFound(); 

  const {blocks, category, publishedAt, subtitle, title, bookAuthor, bookCover, bookCoverAlt, bookCoverAnnotation} = book
  
  return (
    <article className="w-full flex flex-col">
      <BookHeader category={category || "NEWS"} title={title} bookAuthor={bookAuthor}/>
      <BookHeaderImage bookCover={bookCover} bookCoverAlt={bookCoverAlt} bookCoverAnnotation={bookCoverAnnotation}/>
      <BlockRenderer blocks={blocks}/>
      <ArticleMoreNewsTab/>
    </article>
  );
}

        
      