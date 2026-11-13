'use client';
import { BlockInputProps } from "@/lib/editor/blocks";
import { BlockShell } from "./BlockShell";
import { TextInput } from "./TextInput";

export const QuoteInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"quote">) => (
  <BlockShell id={id} title="Quote" onDelete={deleteBlockFn}>
    <div className="flex flex-col gap-1 pl-2">
      <TextInput label="Quote" value={value.quote} onChange={(quote) => onChange({ quote })} placeholder="Type quote..." multiline />
      <div className="flex flex-row gap-4">
        <TextInput label="Author" value={value.quoteAuthor} onChange={(quoteAuthor) => onChange({ quoteAuthor })} placeholder="Who said it?" />
        <TextInput label="Author role" value={value.authorRole} onChange={(authorRole) => onChange({ authorRole })} placeholder="e.g. Physicist" />
      </div>
    </div>
  </BlockShell>
);