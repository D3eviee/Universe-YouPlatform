import katex from 'katex';
import 'katex/dist/katex.min.css'; 
import type { BlockData } from "@/lib/schemas/blocks";

type ClientEquationProps = {
  equationExpression: string;
  equationCaption: string;
}

export const ClientEquation = ({ data }: { data: BlockData<"equation"> }) => {
  function renderExpression(expression: string) {
    try {
      return katex.renderToString(expression, {
        displayMode: true,
        throwOnError: false 
      })
    } catch(e) {
      return `<span class="text-red-500">Invalid formula</span>`;
    }  
  } 
  
  const rawHtml = renderExpression(data.equationExpression);
  
  return (
    <div className="mx-auto w-[86%] max-w-91.5 flex flex-col justify-center items-center mb-8">
      <div 
        className="text-center w-full overflow-x-auto text-header text-xl leading-6" 
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
      <p className="text-pretty text-center text-basic text-dark-gray font-medium -tracking-[0.325]">{data.equationCaption}</p>
  </div>
  )
}