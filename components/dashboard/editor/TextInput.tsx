
'use client';
import { useId } from "react";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
};

export const TextInput = ({ label, value, onChange, placeholder, multiline = false, className = "" }: FieldProps) => {
  const id = useId();
  const inputClass = "editor-input field-sizing-content w-full";

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className={inputClass} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type="text" className={inputClass} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
};