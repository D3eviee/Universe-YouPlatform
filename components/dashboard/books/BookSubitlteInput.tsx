'use client'
import useBookEditorStore from "@/store/BookEditorStore";

const BookSubtitleInput = () => {
  const bookAuthor = useBookEditorStore(store => store.activeBook?.subtitle || "");
  const updateBookField = useBookEditorStore(store => store.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
    <label htmlFor="subtitle" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Subtitle</label>
    <input 
        type="text" 
        id="subtitle" 
        className="editor-input field-sizing-content" 
        placeholder="Book author here..." 
        value={bookAuthor}
        onChange={(e) => {updateBookField("subtitle", e.target.value)} }
    />
</div>
  )
}

export default BookSubtitleInput