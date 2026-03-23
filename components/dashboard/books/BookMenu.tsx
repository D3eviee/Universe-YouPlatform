"use client"
import { useDashboardBooks } from "@/hooks/useDashboardBooks"
import useBookEditorStore from "@/store/BookEditorStore"
import { Book } from "@/server/schema"
import { useEffect, useMemo, useRef, useState } from "react"
import BookMenuItem from "./BookMenuItem"
import AsideMenuContainer from "../AsideMenuContainer"
import { useDebounce } from "@/hooks/useDebounce"
import SearchInput from "../SearchInput"
import SkeletonMenu from "@/components/SkeletonMenu"

const BookMenu = () => {
  const isMenuInitialized = useRef(false);
  const { setActiveBook } = useBookEditorStore()

  // SEARCH VALUE
  const [ searchTerm, setSearchTerm ] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { data: books, isLoading, isError, isSuccess } = useDashboardBooks()

  const filteredBooks = useMemo(() => {
      if (!books) return [];
      if (!debouncedSearchTerm) return books;
      
      const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
      
      return books.filter(({category, bookAuthor, title}: Book) => {
        return title.toLowerCase().includes(lowerCaseTerm) || bookAuthor.toLowerCase().includes(lowerCaseTerm) ||  category.toLowerCase().includes(lowerCaseTerm)
      });
    }, [books, debouncedSearchTerm]); 
  
  useEffect(() => {
    if(isSuccess && books?.length > 0 && !isMenuInitialized.current) {
      setActiveBook(books[0]);
      isMenuInitialized.current = true;
    }
  }, [isSuccess, books, setActiveBook]);

  return (
    <AsideMenuContainer>
      {isLoading && <SkeletonMenu/> } 
      {isError && <p className="text-red-500 text-sm py-5 ms-auto me-auto">Error occured while loading books.</p>}

      {!isLoading && !isError && (
        <>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm} 
            placeholder="Search for book..."
          />

          <div className="flex flex-col gap-2 overflow-y-auto">
            { !filteredBooks || filteredBooks.length === 0 ? ( 
              <p className="text-gray-500 text-sm ms-auto me-auto mt-3"> { searchTerm ? "No results" : "Empty here, let's add some content"} </p> )
              : (filteredBooks.map((book: Book) => ( <BookMenuItem key={book.id} book={book}/> )))
            }
          </div>
        </>
      )} 
    </AsideMenuContainer>
  )
}

export default BookMenu