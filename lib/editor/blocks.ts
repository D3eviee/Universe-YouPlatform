import type { BlockType, EditorBlock, BlockData} from "@/lib/schemas/blocks";

const emptyImage = () => ({ imageDescription: "", imageAlt: "", imageSource: "", imageFile: "" as string | File });

/** A new, empty block of the given type. */
export function createEmptyBlock(type: BlockType): EditorBlock {
  const id = crypto.randomUUID();
  switch (type) {
    case "heading":        return { id, type, data: { text: "" } };
    case "paragraph":      return { id, type, data: { text: "" } };
    case "highlight":      return { id, type, data: { text: "" } };
    case "image":          return { id, type, data: emptyImage() };
    case "gallery":        return { id, type, data: { images: [emptyImage()] } };
    case "quote":          return { id, type, data: { quote: "", quoteAuthor: "", authorRole: "" } };
    case "equation":       return { id, type, data: { equationExpression: "", equationCaption: "" } };
    case "sources":        return { id, type, data: { sources: [""] } };
    case "lab-predefined": return { id, type, data: { moduleName: "" } };
  }
}

/** Toolbar entries, in display order. */
export const BLOCK_TOOLS: { type: BlockType; label: string }[] = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "image", label: "Image" },
  { type: "gallery", label: "Gallery" },
  { type: "highlight", label: "Highlight" },
  { type: "quote", label: "Quote" },
  { type: "equation", label: "Equation" },
  { type: "sources", label: "Sources" },
  { type: "lab-predefined", label: "Predefined lab" },
];

export type BlockInputProps<T extends BlockType> = {
  id: string;
  value: BlockData<T>;
  onChange: (patch: Partial<BlockData<T>>) => void;
  deleteBlockFn: (id: string) => void;
};