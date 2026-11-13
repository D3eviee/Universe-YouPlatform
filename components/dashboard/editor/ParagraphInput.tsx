'use client';
import { useId } from "react";
import { BlockShell } from "./BlockShell";
import type { BlockInputProps } from "@/lib/editor/blocks";

export const ParagraphInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"paragraph">) => {
  const textareaId = useId()
  
  return (
    <BlockShell id={id} title="Paragraph" onDelete={deleteBlockFn}>
      <label htmlFor={textareaId} className="sr-only">Paragraph text</label>
      <textarea
        id={textareaId}
        value={value.text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Write your paragraph..."
        className="editor-input field-sizing-content w-full bg-transparent outline-none leading-relaxed text-15 text-white resize-none"
      />
    </BlockShell>
  );
};