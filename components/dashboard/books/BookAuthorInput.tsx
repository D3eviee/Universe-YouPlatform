'use client'
import useBookEditorStore from "@/store/BookEditorStore";

const BookAuthorInput = () => {
  const bookAuthor = useBookEditorStore(store => store.activeBook?.bookAuthor || "");
  const updateBookField = useBookEditorStore(store => store.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
    <label htmlFor="title" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Book author</label>
    <input 
        type="text" 
        id="title" 
        className="editor-input field-sizing-content" 
        placeholder="Book author here..." 
        value={bookAuthor}
        onChange={(e) => {updateBookField("bookAuthor", e.target.value)} }
    />
</div>
  )
}

export default BookAuthorInput