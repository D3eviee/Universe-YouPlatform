'use client'
import { useId } from "react";

type QuoteInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
};

export const QuoteInput = ({ label, value, onChange, placeholder, autoFocus }: QuoteInputProps) => {
  const id = useId();
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor={id} className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase px-2">{label}</label>
      
      <textarea 
        id={id}
        className="editor-input field-sizing-content"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  )
}