import BookThumbnail from "@/components/BookThumbnail";
import { getBooks } from "@/server/queries/books";

export default async function Books() {
  const books = await getBooks()

  return (
    <section className="flex-1 w-full pt-8 pb-10">
      <div className="mx-auto w-[87.5%] max-w-91.5">
        <h2 className="text-[#161618] font-bold text-xl mb-4">March 2026</h2>

        { books.length == 0 
          ? <p>There is no books to read. Come back later.</p>
          :
            <ul role="list" className="flex flex-row flex-wrap w-full max-w-103 ms-auto me-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13">
              {books.map(book => (<BookThumbnail key={book.id} book={book}/>))}
            </ul>
        }
      </div>
    </section>
  );
}