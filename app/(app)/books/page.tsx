import { BookCard } from "@/components/BookCard";
import { getBooks } from "@/server/queries/books";

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <section className="flex-1 w-full flex flex-col px-4 p-12">
      <div className="w-full mx-auto flex flex-col flex-wrap tablet:w-172 laptop:w-5xl">
        <h2 className="text-3xl font-bold text-dark-black leading-none font-stretch-105%  tablet:w-172 laptop:w-5xl tablet:mx-auto">Books</h2>

        { books.length == 0 
          ? <p>There is no books to read. Come back later.</p>
          :
            <ul role="list" className="flex flex-row flex-wrap w-full mx-auto tablet:max-w-none mt-8 laptop:mt-10 tablet:gap-8">
              {books.map(book => (<BookCard key={book.id} book={book}/>))}
            </ul>
        }
      </div>
    </section>
  );
}