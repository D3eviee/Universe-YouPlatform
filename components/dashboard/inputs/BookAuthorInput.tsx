'use client'
import useBookEditorStore from "@/store/BookEditorStore";

const BookAuthorInput = () => {
  const bookAuthor = useBookEditorStore(store => {
    const book = store.activeBook;
    if (!book) return "";
    return typeof book.bookAuthor === 'object' && book.bookAuthor !== null && 'name' in book.bookAuthor
      ? (book.bookAuthor as any).name
      : "";
  });
  const updateBookField = useBookEditorStore(store => store.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor="bookAuthor" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Book Author</label>
      <input 
        type="text" 
        id="bookAuthor" 
        className="editor-input field-sizing-content" 
        placeholder="Type book author here..." 
        value={bookAuthor}
        onChange={(e) => {updateBookField("bookAuthor", { name: e.target.value })} }
      />
    </div>
  )
}

export default BookAuthorInput