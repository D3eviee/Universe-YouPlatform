'use client'
import useBookEditorStore from "@/store/BookEditorStore";
import { useState } from "react";

const BookCoverInput = () => {
  const activeBook = useBookEditorStore(store => store.activeBook);
  const updateBookField = useBookEditorStore(store => store.updateBookField);
  const [preview, setPreview] = useState<string | null>(activeBook?.bookCover || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateBookField("bookCover", file as any);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor="bookCover" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase mb-3">Book Cover</label>
      <input 
        type="file" 
        id="bookCover" 
        accept="image/*"
        className="mb-3"
        onChange={handleFileChange}
      />
      {preview && (
        <div className="mt-3">
          <img 
            src={preview} 
            alt="Book cover preview" 
            className="max-h-48 rounded-lg"
          />
        </div>
      )}
      <div className="mt-4 flex flex-col">
        <label htmlFor="bookCoverAlt" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase mb-2">Cover Alt Text</label>
        <input 
          type="text" 
          id="bookCoverAlt" 
          className="editor-input" 
          placeholder="Alt text for cover image..." 
          value={activeBook?.bookCoverAlt || ""}
          onChange={(e) => {updateBookField("bookCoverAlt", e.target.value)} }
        />
      </div>
    </div>
  )
}

export default BookCoverInput