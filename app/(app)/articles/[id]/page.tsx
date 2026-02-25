import ClientParagraph from "@/app/components/client-text-blocks/ClientParagraph";
import Image from "next/image";

export default function Home() {
  return (
    <article className="flex flex-col h-full w-full">
      <div className="mt-8 mb-5 w-full">
        <div className="h-full mb-5 mx-auto w-[87.5%] max-w-91.5">
          <p className="text-xs font-bold text-[#5B5B60]">UPDATE</p>
          <p className="text-sm font-medium text-[#535358] mt-1">February 8, 2026</p>
        </div>

        <h1 className="text-[32px] font-bold text-[#161618] leading-9 mx-auto w-[87.5%] max-w-91.5">Xcode 26.3 unlocks the power of agentic coding</h1>
        <h2 className="text-xl font-medium leading-6.5 mt-4 mx-auto w-[87.5%] max-w-91.5">Developers can leverage coding agents, including Anthropic’s Claude Agent and OpenAI’s Codex, directly in Xcode to tackle complex tasks autonomously, helping them develop apps faster than ever</h2>

        <div className="w-full my-8">
          <div className="relative aspect-video overflow-hidden">
            <Image src="/hero-section-bg.jpg" className="object-cover w-full" fill alt="this is image"/>
          </div>
           <p className="mt-3 mx-auto w-[87.5%] max-w-91.5 text-[#5B5B60] text-xs">Xcode 26.3 przynosi programowanie agentowe, umożliwiając deweloperom korzystanie z agentów, takich jak Claude Agent firmy Anthropic i Codex firmy OpenAI, bezpośrednio w Xcode.</p>
        </div>
      </div>

      <ClientParagraph/>
    </article>
  );
}