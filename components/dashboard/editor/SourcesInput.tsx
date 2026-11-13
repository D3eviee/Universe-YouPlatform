'use client';
import { Plus, X } from "lucide-react";
import { BlockShell } from "./BlockShell";
import { TextInput } from "./TextInput";
import { BlockInputProps } from "@/lib/editor/blocks";

export const SourcesInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"sources">) => {
  const sources = value.sources ?? [];
  const setSources = (next: string[]) => onChange({ sources: next });

  return (
    <BlockShell
      id={id}
      title="Sources"
      onDelete={deleteBlockFn}
      actions={
        <button
          type="button"
          onClick={() => setSources([...sources, ""])}
          aria-label="Add source"
          title="Add source"
          className="flex items-center px-1.5 py-0.5 bg-light-gray rounded-lg font-medium shadow-sm cursor-pointer hover:bg-white transition-colors"
        >
          <Plus aria-hidden="true" size={18} strokeWidth={1.5} className="text-secondary-dark" />
        </button>
      }
    >
      <ol className="flex flex-col gap-4 px-2">
        {sources.map((source, index) => (
          <li key={index} className="flex flex-row items-end gap-4">
            <TextInput
              label={`Source ${index + 1}`}
              value={source}
              onChange={(text) => setSources(sources.map((s, i) => (i === index ? text : s)))}
              placeholder="Book title, article, URL…"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => setSources(sources.filter((_, i) => i !== index))}
              aria-label={`Remove source ${index + 1}`}
              title="Remove source"
              className="mb-1 flex items-center p-1 bg-light-gray rounded-lg font-medium shadow-sm cursor-pointer"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </li>
        ))}
      </ol>
    </BlockShell>
  );
};