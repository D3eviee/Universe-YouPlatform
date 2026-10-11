import type { EditorBlock } from "@/types";
import { ClientParagraph } from "./client-text-blocks/ClientParagraph";
import { ClientImage } from "./client-text-blocks/ClientImage";
import { ClientQuote } from "./client-text-blocks/ClientQuote";
import { ClientEquation } from "./client-text-blocks/ClientEquation";
import { ClientHighlight } from "./client-text-blocks/ClientHighlight";
import { ClientHeading } from "./client-text-blocks/ClientHeading";
import { ClientLab } from "./labs/ClientLab";
import { ClientSources } from "./client-text-blocks/ClientSources";
import { ClientPredefinedLab } from "./labs/ClientPredefinedLab";
import { ImageCarouselBlock } from "./client-text-blocks/ImageCarouselBlock";

interface BlockRendererProps {
  blocks: EditorBlock[];
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="relative flex flex-col my-8 overflow-hidden">
      {blocks.map(({id, data, type}) => {
        switch (type) {
          case "heading": return <ClientHeading key={id} data={data}/>;
          case "paragraph": return <ClientParagraph key={id} data={data}/>;
          case "quote": return <ClientQuote data={data} key={id}/>;
          case "image": return <ClientImage key={id} data={data}/>;
          case "gallery": return <ImageCarouselBlock key={id} data={data}/>;
          case "equation": return <ClientEquation key={id} data={data}/>;
          case "highlight": return <ClientHighlight key={id} data={data}/>;
          case "sources": return <ClientSources key={id} data={data}/>;
          case "lab-predefined": return <ClientPredefinedLab key={id} data={data}/>;
          case "lab": return <ClientLab key={id} data={data}/>;
          default:
            console.warn(`BlockRenderer: Nieobsługiwany typ bloku - ${type}`);
            return null;
        }
      })}
    </div>
  );
}

