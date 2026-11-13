'use client';
import { BlockInputProps } from "@/lib/editor/blocks";
import { BlockShell } from "./BlockShell";
import { TextInput } from "./TextInput";

export const HighlightInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"highlight">) => (
  <BlockShell id={id} title="Highlight" onDelete={deleteBlockFn}>
    <TextInput label="Highlighted text" value={value.text} onChange={(text) => onChange({ text })} placeholder="Highlight for your article" multiline />
  </BlockShell>
);