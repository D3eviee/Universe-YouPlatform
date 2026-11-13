import type { BlockData } from "@/lib/schemas/blocks";

export const ClientHeading = ({ data }: { data: BlockData<"heading"> }) => (
  <h2 className="w-full max-w-90.5 tablet:max-w-none tablet:w-xl laptop:w-163 mx-auto px-2 tablet:px-0 my-6 font-bold text-xl laptop:text-2xl text-dark-black tracking-[0.025em]">
    {data.text}
  </h2>
);