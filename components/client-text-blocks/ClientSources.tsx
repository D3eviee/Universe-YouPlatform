type ClientSourcesProps = {
  data: { sources: string[] };
};

export const ClientSources = ({ data }: ClientSourcesProps) => {
  const { sources } = data;
  if (!sources || sources.length === 0) return null;

  return (
    <div className="w-[86.5%] py-4 px-4 mx-auto tablet:w-143 laptop:w-162 laptop:text-lg border-y-[0.5px] border-y-spanish-gray/30 mt-6">
      <h4 className="text-xs font-medium font-stretch-110% text-dark-black uppercase mb-3">Sources</h4>
      
      <ul className="flex flex-col gap-3">
        {sources.map((source, idx) => (
            <li key={idx} className="px-2 flex items-start gap-2 text-sm tablet:text-base font-light text-dark-gray">
              <span className="text-xs">{idx + 1}.</span>
              <span className="wrap-break-words text-xs">{source}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}