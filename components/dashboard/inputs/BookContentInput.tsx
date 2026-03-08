'use client'
import useBookEditorStore from "@/store/BookEditorStore";

const BookContentInput = () => {
  const content = useBookEditorStore(store => {
    const book = store.activeBook;
    if (!book) return "";
    return typeof book.content === 'object' && book.content !== null && 'text' in book.content
      ? (book.content as any).text
      : "";
  });
  const updateBookField = useBookEditorStore(store => store.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor="content" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Description</label>
      <textarea 
        id="content" 
        className="editor-input field-sizing-content w-full" 
        value={content} 
        placeholder="Book description..."
        onChange={(e) => {updateBookField("content", { text: e.target.value })} }
      />
    </div>
  )
}

export default BookContentInput