import BookCard from "@/components/BookCard";
import BookThumbnail from "@/components/BookThumbnail";
import { getBooks } from "@/server/queries/books";

export default async function Books() {
  const books = await getBooks()

  return (
    <section className="flex-1 w-full pt-8 pb-10">
      <div className="w-[86.5%] ms-auto me-auto mb-3 tablet:w-143 laptop:w-162">
        <h2 className="text-[#161618] font-bold text-xl mb-4 laptop:text-2xl">Books</h2>

        { books.length == 0 
          ? <p>There is no books to read. Come back later.</p>
          :
            <ul role="list" className="flex flex-row flex-wrap w-full max-w-103 ms-auto me-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13 tablet:gap-8">
              {books.map(book => (<BookCard key={book.id} book={book}/>))}
            </ul>
        }
      </div>
    </section>
  );
}