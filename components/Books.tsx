import { BookThumbnail } from "@/types"
import BookCard from "./BookCard"
import GoToButton from "./GoToButton"

const Books = ({books}:{books:BookThumbnail[]}) => {

  return (
    <section className="w-full flex flex-col p-8 bg-[#FFF]">
      <div className="tablet:w-173 me-auto ms-auto laptop:w-245">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Książki</h2>

        <div className="flex flex-col gap-8 tablet:flex-row ">
          {books.map(book => <BookCard key={book.id} book={book}/>)}
        </div>

        <GoToButton label="View All" to="/books" styles="bg-[#F5F5F5]"/>
      </div>
    </section>
  )
}

export default Books