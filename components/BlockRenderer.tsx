import type { EditorBlock } from "@/types";
import ClientParagraph from "./client-text-blocks/ClientParagraph";
import ClientImage from "./client-text-blocks/ClientImage";
import ClientQuote from "./client-text-blocks/ClientQuote";
import ClientEquation from "./client-text-blocks/ClientEquation";
import ClientHighlight from "./client-text-blocks/ClientHighlight";
import ClientHeading from "./client-text-blocks/ClientHeading";

interface BlockRendererProps {
  blocks: EditorBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col my-8">
      {blocks.map(({id, data, type}) => {
        switch (type) {
          // --- HEADING ---
          case "heading":
            return (
              <ClientHeading key={id} data={data}/>
            );

          // --- PARAGRAPH ---
          case "paragraph":
            return (
              <ClientParagraph key={id} data={data}/>
            );

          // --- QUOTE ---
          case "quote":
            return (
              <ClientQuote data={data} key={id}/>
            );

          // --- IMAGE ---
          case "image": 
            return <ClientImage key={id} data={data}/>

          // --- EQUATION ---
          case "equation":
            return <ClientEquation key={id} data={data}/>
            
            // --- HIGHLIGHT ---
          case "highlight":
            return <ClientHighlight key={id} data={data}/>

          // --- DEFAULT (ZABEZPIECZENIE) ---
          default:
            console.warn(`BlockRenderer: Nieobsługiwany typ bloku - ${type}`);
            return null;
        }
      })}
    </div>
  );
}