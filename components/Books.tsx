import { BookCard } from "./BookCard"
import { GoToButton } from "./GoToButton"
import { getLatestBooks } from "@/server/queries/books"

export const Books = async () => {
  const latestBooks = await getLatestBooks()

  return (
    <section className="w-full flex flex-col bg-[#FFF] px-8 py-16  laptop:pt-20 pb-10.5">
      <h2 className="section-head">Books</h2>
      
      <div className="w-full flex flex-col flex-wrap  me-auto ms-auto gap-6 tablet:flex-row tablet:w-172 laptop:w-242 laptop:flex-row laptop:flex-wrap mb-6">
        { latestBooks.map(book => <BookCard key={book.id} book={book}/>) }
      </div>

      <GoToButton label="View All" to="/books" styles="bg-[#F5F5F5]"/>
    </section>
  )
}