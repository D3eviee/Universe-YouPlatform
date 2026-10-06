import { ExternalLink } from "lucide-react";

type ClientSourcesProps = {
  data: { sources: string[] };
};

export const ClientSources = ({ data }: ClientSourcesProps) => {
  const { sources } = data;
  if (!sources || sources.length === 0) return null;

  return (
    <div className="w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 laptop:text-lg px-10 py-6 border-[0.5px] border-spanish-gray/30 rounded-4xl my-8 mb-22  bg-light-gray">
      <h4 className="text-xs font-medium font-stretch-110% text-spanish-gray uppercase mb-6">Sources & References</h4>
      
      <ul className="flex flex-col gap-3">
        {sources.map((source, idx) => {
          const isUrl = source.startsWith('http://') || source.startsWith('https://');

          return (
            <li key={idx} className="flex items-start gap-3 text-sm tablet:text-base font-light text-dark-gray leading-relaxed">
              <span className="text-spanish-gray font-medium select-none text-xs">{idx + 1}.</span>
              
              {isUrl ? (
                <a 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-dark-black transition-colors inline-flex items-baseline gap-1.5 border-b border-transparent hover:border-dark-black"
                >
                  <span className="break-all">{source}</span>
                  <ExternalLink size={12} className="shrink-0 relative top-0.5" />
                </a>
              ) : (
                <span className="wrap-break-words text-xs font-light">{source}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}