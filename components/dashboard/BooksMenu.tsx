"use client"
import { useBooks } from "@/hooks/useBooks"
import useBookEditorStore from "@/store/BookEditorStore"
import { Book } from "@/server/schema"
import { useEffect } from "react"

const BooksMenu = () => {
  const { setActiveBook, activeBook } = useBookEditorStore()
  const { data: books, isLoading, isError, isSuccess } = useBooks()

  useEffect(() => {
    if (isSuccess && books && books.length > 0) {
      setActiveBook(books[0])
    }
  }, [isSuccess, books, setActiveBook])

  return (
    <aside className="h-full min-w-80 shrink-0 flex-1 flex-col gap-[0.5px] bg-secondary-dark p-3 overflow-scroll">
      <input
        type="search"
        placeholder="Search books"
        className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"
      />

      {isLoading && <p className="text-gray-400 text-sm animate-bounce">Loading...</p>}
      {isError && <p className="text-red-500 text-sm">Error loading books.</p>}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {books?.length === 0
            ? (<p className="text-gray-400 text-sm">No books in database.</p>)
            : books?.map((book: Book) => (
                <div
                  key={book.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeBook?.id === book.id
                      ? "bg-blue-700"
                      : "bg-input hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveBook(book)}
                >
                  <p className="text-white text-sm font-medium line-clamp-2">{book.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{book.category}</p>
                </div>
              ))
          }
        </div>
      )}
    </aside>
  )
}

export default BooksMenu