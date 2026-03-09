'use client'

import useBookEditorStore from "@/store/BookEditorStore";

const BookTitleInput = () => {
  const title = useBookEditorStore(store => store.activeBook?.title || "");
  const updateBookField = useBookEditorStore(store => store.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
    <label htmlFor="title" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Book title</label>
    <input 
        type="text" 
        id="title" 
        className="editor-input field-sizing-content" 
        placeholder="Type book title here..." 
        value={title}
        onChange={(e) => {updateBookField("title", e.target.value)} }
    />
</div>
  )
}

export default BookTitleInput