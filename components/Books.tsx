import BookCard from "./BookCard"
import GoToButton from "./GoToButton"
import { getLatestBooks } from "@/server/queries/books"

const Books = async () => {
  const latestBooks = await getLatestBooks()

  return (
    <section className="w-full flex flex-col p-8 bg-[#FFF]">
      <div className="tablet:w-173 me-auto ms-auto laptop:w-245">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Latest books</h2>

        <div className="flex flex-col gap-8 tablet:flex-row ">
          { latestBooks.map(book => <BookCard key={book.id} book={book}/>) }
        </div>

        <GoToButton label="View All" to="/books" styles="bg-[#F5F5F5]"/>
      </div>
    </section>
  )
}

export default Books