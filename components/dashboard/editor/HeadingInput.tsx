'use client';
import { BlockInputProps } from "@/lib/editor/blocks";
import { BlockShell } from "./BlockShell";
import { TextInput } from "./TextInput";

export const HeadingInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"heading">) => (
  <BlockShell id={id} title="Heading" onDelete={deleteBlockFn}>
    <TextInput label="Heading text" value={value.text} onChange={(text) => onChange({ text })} placeholder="Heading for your section" multiline />
  </BlockShell>
);