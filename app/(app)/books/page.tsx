import type { Metadata } from "next";
import { BookCard } from "@/components/client/books/BookCard";
import { getBooks } from "@/server/queries/books";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Books",
  description: "Book reviews and recommendations.",
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <section className="flex-1 w-full px-4 py-12">
      <div className="w-full mx-auto tablet:w-172 laptop:w-5xl">
        <h1 className="text-3xl font-bold text-dark-black leading-none font-stretch-105%">Books</h1>

        {books.length === 0 ? (
          <p className="mt-8 text-dark-gray">There are no books yet. Come back later.</p>
        ) : (
          <ul role="list" className="mt-8 laptop:mt-10 grid grid-cols-1 gap-6 tablet:grid-cols-2 tablet:gap-8 laptop:grid-cols-3">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}