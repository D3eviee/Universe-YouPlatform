'use client';
import { useId } from "react";
import { ImagePicker } from "../editor/ImagePicker";
import useBookEditorStore from "@/store/BookEditorStore";

export const BookCoverUpload = () => {
  const bookCover = useBookEditorStore((s) => s.activeBook.bookCover);
  const bookCoverAlt = useBookEditorStore((s) => s.activeBook.bookCoverAlt);
  const bookCoverAnnotation = useBookEditorStore((s) => s.activeBook.bookCoverAnnotation);
  const updateBookField = useBookEditorStore((s) => s.updateBookField);
  const ids = { alt: useId(), annotation: useId() };

  const inputClass = "border rounded-md mt-1 border-focus outline-0 focus:ring-1 focus:ring-focus px-2 py-0.5 text-white text-sm bg-transparent";

  return (
    <div className="w-full flex flex-col gap-2 px-2">
      <p className="text-gray-400 font-light tracking-wider text-xs uppercase">Book cover image</p>

      <ImagePicker
        value={bookCover}
        onSelect={(file) => updateBookField("bookCover", file)}
        label="book cover"
        className="w-3/5 h-60 mb-3 rounded-2xl"
      />

      <div className="flex flex-col gap-0.5">
        <label htmlFor={ids.alt} className="text-gray-200 tracking-wider text-xs">Cover alt</label>
        <input
          id={ids.alt}
          type="text"
          maxLength={250}
          className={inputClass}
          value={bookCoverAlt}
          onChange={(e) => updateBookField("bookCoverAlt", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor={ids.annotation} className="text-gray-200 tracking-wider text-xs">Cover source</label>
        <input
          id={ids.annotation}
          type="text"
          maxLength={250}
          className={inputClass}
          value={bookCoverAnnotation}
          onChange={(e) => updateBookField("bookCoverAnnotation", e.target.value)}
        />
      </div>
    </div>
  );
};