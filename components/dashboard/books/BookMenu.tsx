"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Book } from "@/server/schema";
import useBookEditorStore from "@/store/BookEditorStore";
import { useDashboardBooks } from "@/hooks/useDashboardBooks";
import { useIsSavedBook } from "@/hooks/useIsSavedBook";
import { useDebounce } from "@/hooks/useDebounce";
import { getCategory } from "@/lib/constants/categories";
import { AsideMenuContainer } from "../shared/AsideMenuContainer";
import { SearchInput } from "../shared/SearchInput";
import { SkeletonMenu } from "@/components/dashboard/shared/SkeletonMenu";
import { BookMenuItem } from "./BookMenuItem";

export const BookMenu = () => {
  const { data: books = [], isLoading, isError, isSuccess } = useDashboardBooks();
  const setActiveBook = useBookEditorStore((s) => s.setActiveBook);
  const activeId = useBookEditorStore((s) => s.activeBook.id);
  const isSaved = useIsSavedBook();

  // SEARCH (title, author, or category label)
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredBooks = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return books;
    return books.filter(({ title, bookAuthor, category }) =>
      [title, bookAuthor, getCategory(category)?.label ?? ""].some((text) => text.toLowerCase().includes(term)),
    );
  }, [books, debouncedSearchTerm]);
  
  // SWITCHING BOOKS: ASK BEFORE THROWING AWAY UNSAVED EDITS
  const handleSelect = (book: Book) => {
    if (book.id === activeId) return;
    if (!isSaved && !confirm("You have unsaved changes. Discard them?")) return;
    setActiveBook(book);
  };

  // OPEN THE NEWEST BOOK ONCE, WHEN THE LIST FIRST LOADS
  const isMenuInitialized = useRef(false);
  useEffect(() => {
    if (isMenuInitialized.current || !isSuccess) return;
    isMenuInitialized.current = true;
    if (books.length > 0) setActiveBook(books[0]);
  }, [isSuccess, books, setActiveBook]);

  return (
    <AsideMenuContainer>
      {isLoading && <SkeletonMenu/> } 
      {isError && ( <p role="alert" className="text-red-500 text-sm py-5 text-center">Error occurred while loading books.</p> )}

      {isSuccess && (
        <>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm} 
            placeholder="Search for book..."
          />
          
          <ul className="flex flex-col gap-2">
            {filteredBooks.length === 0 ? (
              <li className="text-gray-500 text-sm text-center mt-3">
                {debouncedSearchTerm ? "No results" : "Empty here, let's add some content"}
              </li>
            ) : (
              filteredBooks.map((book) => (
                <li key={book.id}>
                  <BookMenuItem book={book} onSelect={() => handleSelect(book)} />
                </li>
              ))
            )}
          </ul>
        </>
      )} 
    </AsideMenuContainer>
  )
}