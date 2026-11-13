import type { BlockData } from "@/lib/schemas/blocks";

const isUrl = (text: string) => /^https?:\/\/\S+$/.test(text.trim());

export const ClientSources = ({ data }: { data: BlockData<"sources"> }) => {
  const sources = data.sources.filter((s) => s.trim());
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby="sources-heading" className="w-[86.5%] py-4 px-4 mx-auto tablet:w-143 laptop:w-162 border-y-[0.5px] border-y-spanish-gray/30 mt-6">
      <h2 id="sources-heading" className="text-xs font-medium font-stretch-110% text-dark-black uppercase mb-3">Sources</h2>
      <ol className="flex flex-col gap-3 list-decimal pl-6 marker:text-xs text-xs text-dark-gray font-light">
        {sources.map((source, i) => (
          <li key={i} className="wrap-break-word">
            {isUrl(source) ? (
              <a href={source.trim()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-dark-black">
                {source}
              </a>
            ) : (
              source
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};