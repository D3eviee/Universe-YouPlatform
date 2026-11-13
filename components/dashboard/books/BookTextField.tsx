'use client';
import { useId } from "react";
import useBookEditorStore from "@/store/BookEditorStore";

type BookTextFieldName = "title" | "subtitle" | "bookAuthor";

type BookTextFieldProps = {
  field: BookTextFieldName;
  label: string;
  placeholder: string;
  maxLength?: number;
};

/** A labelled text input bound to one text field of the active book. */
export const BookTextField = ({ field, label, placeholder, maxLength }: BookTextFieldProps) => {
  const id = useId();
  const value = useBookEditorStore((s) => s.activeBook[field] ?? "");
  const updateBookField = useBookEditorStore((s) => s.updateBookField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor={id} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="editor-input field-sizing-content"
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => updateBookField(field, e.target.value)}
      />
    </div>
  );
};