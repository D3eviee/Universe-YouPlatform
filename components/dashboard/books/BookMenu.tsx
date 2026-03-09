"use client"
import { useBooks } from "@/hooks/useBooks"
import useBookEditorStore from "@/store/BookEditorStore"
import { Book } from "@/server/schema"
import { useEffect } from "react"
import { Oval } from "react-loader-spinner"
import BookMenuItem from "./BookMenuItem"
import AsideMenuContainer from "../AsideMenuContainer"

const BookMenu = () => {
  const { setActiveBook } = useBookEditorStore()
  const { data: books, isLoading, isError, isSuccess } = useBooks()

  useEffect(() => {
    if (isSuccess && books && books.length > 0) setActiveBook(books[0])
  }, [isSuccess, books, setActiveBook])

  return (
    <AsideMenuContainer>
      <input
        type="search"
        placeholder="Search books"
        className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"
      />

      {isLoading && <div className="flex items-center justify-center"><Oval strokeWidth={3} width={28} color="#4085F7" secondaryColor="#4085F7"/></div> } 
      {isError && <p className="text-red-300 text-sm py-5 text-center">There was a problem with getting books.</p>}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {books?.length === 0
            ? <p className="text-gray-400 text-sm py-5 text-center">No items. Let's add some color.</p>
            : books?.map((book: Book) => <BookMenuItem key={book.id} book={book}/>)
          }
        </div>
      )}
    </AsideMenuContainer>
  )
}

export default BookMenu