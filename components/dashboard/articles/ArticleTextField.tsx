'use client';
import { useId } from "react";
import useArticleEditorStore from "@/store/ArticleEditorStore";

type ArticleTextFieldProps = {
  field: "title" | "subtitle";
  label: string;
  placeholder: string;
  maxLength?: number;
  multiline?: boolean;
};

export const ArticleTextField = ({ field, label, placeholder, maxLength, multiline }: ArticleTextFieldProps) => {
  const id = useId();
  const value = useArticleEditorStore((s) => s.activeArticle[field] ?? "");
  const updateArticleField = useArticleEditorStore((s) => s.updateArticleField);
  const props = {
    id,
    placeholder,
    maxLength,
    value,
    className: "editor-input field-sizing-content w-full",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateArticleField(field, e.target.value),
  };

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor={id} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">{label}</label>
      {multiline ? <textarea {...props} /> : <input type="text" {...props} />}
    </div>
  );
};