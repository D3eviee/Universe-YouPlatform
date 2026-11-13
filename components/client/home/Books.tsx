
import { BookCard } from "@/components/client/books/BookCard";
import { GoToButton } from "@/components/client/shared/GoToButton";
import { getLatestBooks } from "@/server/queries/books";

export const Books = async () => {
  const books = await getLatestBooks();
  if (books.length === 0) return null;

  return (
    <section aria-labelledby="books-heading" className="w-full flex flex-col bg-white px-8 pt-16 laptop:pt-20 pb-10.5">
      <h2 id="books-heading" className="section-head">Books</h2>

      <ul role="list" className="w-full mx-auto mb-6 grid grid-cols-1 gap-6 tablet:w-172 tablet:grid-cols-2 laptop:w-242 laptop:grid-cols-3">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} titleAs="h3" />
          </li>
        ))}
      </ul>

      <GoToButton label="View all" href="/books" className="bg-[#F5F5F5]" />
    </section>
  );
};