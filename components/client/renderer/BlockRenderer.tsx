import { ClientParagraph } from "./ClientParagraph";
import { ClientImage } from "./ClientImage";
import { ClientQuote } from "./ClientQuote";
import { ClientEquation } from "./ClientEquation";
import { ClientHighlight } from "./ClientHighlight";
import { ClientHeading } from "./ClientHeading";
import { ClientSources } from "./ClientSources";
import { ClientPredefinedLab } from "./ClientPredefinedLab";
import { ImageCarouselBlock } from "./ImageCarouselBlock"
import { StoredBlock } from "@/lib/schemas/blocks";

export const BlockRenderer = ({ blocks }: { blocks: StoredBlock[] }) => {
  if (!blocks?.length) return null;

  return (
    <div className="relative flex flex-col my-8 overflow-hidden">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":        return <ClientHeading key={block.id} data={block.data} />;
          case "paragraph":      return <ClientParagraph key={block.id} data={block.data} />;
          case "quote":          return <ClientQuote key={block.id} data={block.data} />;
          case "image":          return <ClientImage key={block.id} data={block.data} />;
          case "gallery":        return <ImageCarouselBlock key={block.id} data={block.data} />;
          case "equation":       return <ClientEquation key={block.id} data={block.data} />;
          case "highlight":      return <ClientHighlight key={block.id} data={block.data} />;
          case "sources":        return <ClientSources key={block.id} data={block.data} />;
          case "lab-predefined": return <ClientPredefinedLab key={block.id} data={block.data} />;
          default: {
            const unhandled: never = block;
            console.warn("BlockRenderer: unsupported block type", unhandled);
            return null;
          }
        }
      })}
    </div>
  );
}