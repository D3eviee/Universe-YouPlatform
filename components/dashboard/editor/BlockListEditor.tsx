'use client';
import type { EditorBlock } from "@/lib/schemas/blocks";
import { ParagraphInput } from "./ParagraphInput";
import { HeadingInput } from "./HeadingInput";
import { HighlightInput } from "./HighlightInput";
import { QuoteInput } from "./QuoteInput";
import { EquationInput } from "./EquationInput";
import { ImageInput } from "./ImageInput";
import { GalleryInput } from "./GalleryInput";
import { SourcesInput } from "./SourcesInput";
import { LabPredefinedInput } from "./LabPredefinedInput";

type Props = {
  blocks: EditorBlock[];
  onUpdate: (blockId: string, patch: object) => void;
  onDelete: (blockId: string) => void;
};

export const BlockListEditor = ({ blocks, onUpdate, onDelete }: Props) => (
  <div className="w-full flex flex-col gap-5">
    {blocks.map((block) => {
      const common = {
        id: block.id,
        deleteBlockFn: onDelete,
        onChange: (patch: object) => onUpdate(block.id, patch),
      };

      switch (block.type) {
        case "paragraph":      return <ParagraphInput key={block.id} {...common} value={block.data} />;
        case "heading":        return <HeadingInput key={block.id} {...common} value={block.data} />;
        case "highlight":      return <HighlightInput key={block.id} {...common} value={block.data} />;
        case "quote":          return <QuoteInput key={block.id} {...common} value={block.data} />;
        case "equation":       return <EquationInput key={block.id} {...common} value={block.data} />;
        case "image":          return <ImageInput key={block.id} {...common} value={block.data} />;
        case "gallery":        return <GalleryInput key={block.id} {...common} value={block.data} />;
        case "sources":        return <SourcesInput key={block.id} {...common} value={block.data} />;
        case "lab-predefined": return <LabPredefinedInput key={block.id} {...common} value={block.data} />;
        default: {
          // compile error
          const unhandled: never = block;
          console.warn("BlockListEditor: unsupported block type", unhandled);
          return null;
        }
      }
    })}
  </div>
);