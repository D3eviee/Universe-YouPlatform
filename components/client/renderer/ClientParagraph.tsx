import type { BlockData } from "@/lib/schemas/blocks";

export const ClientParagraph = ({ data }: { data: BlockData<"paragraph"> }) => (
  <p className="whitespace-pre-line px-2 tablet:px-0 w-full max-w-90.5 tablet:max-w-none tablet:w-xl laptop:w-163 mx-auto mb-6 tablet:mb-8 text-dark-black text-base tablet:text-xl font-normal leading-6.5 tablet:leading-7.75 tracking-tight">
    {data.text}
  </p>
);