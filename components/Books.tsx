import BookCard from "./BookCard"
import GoToButton from "./GoToButton"
import { getLatestBooks } from "@/server/queries/books"

const Books = async () => {
  const latestBooks = await getLatestBooks()

  return (
    <section className="w-full flex flex-col bg-[#FFF] px-8 pt-10 laptop:pt-20 pb-10.5">
      <h2 className="section-head">Latest books</h2>
      
      <div className="flex flex-col flex-wrap  me-auto ms-auto gap-6 tablet:flex-row tablet:w-172 laptop:w-242 laptop:flex-row laptop:flex-wrap">
        { latestBooks.map(book => <BookCard key={book.id} book={book}/>) }
      </div>

      <GoToButton label="View All" to="/books" styles="bg-[#F5F5F5]"/>
    </section>
  )
}

export default Books