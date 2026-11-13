'use client';
import { BlockInputProps } from "@/lib/editor/blocks";
import { BlockShell } from "./BlockShell";
import { TextInput } from "./TextInput";

export const EquationInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"equation">) => (
  <BlockShell id={id} title="Equation" onDelete={deleteBlockFn}>
    <div className="flex flex-col gap-1 pl-2">
      <TextInput
        label="Expression (LaTeX)"
        value={value.equationExpression}
        onChange={(equationExpression) => onChange({ equationExpression })}
        placeholder="E = mc^2"
      />
      <TextInput
        label="Caption"
        value={value.equationCaption}
        onChange={(equationCaption) => onChange({ equationCaption })}
        placeholder="Tell something about this equation"
      />
    </div>
  </BlockShell>
);