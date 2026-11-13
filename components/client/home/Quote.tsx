'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Quote as QuoteRow } from "@/server/schema";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

type QuoteProps = { quote: Pick<QuoteRow, "quote" | "author" | "source"> };

export const Quote = ({quote}:QuoteProps) => {
  const container = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);
  const sourceRef = useRef<HTMLParagraphElement>(null);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Only animate for users who haven't asked their device to reduce motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!quoteRef.current || !authorRef.current || !sourceRef.current) return;

      const quoteSplit = new SplitText(quoteRef.current, { type: "words" });
      const authorSplit = new SplitText(authorRef.current, { type: "chars" });
      const sourceSplit = new SplitText(sourceRef.current, { type: "chars" });

      const fade = { opacity: 0, ease: "power3.out", stagger: 0.05 };

      gsap.timeline({ scrollTrigger: { trigger: container.current, start: "top 80%" } })
        .from(quoteSplit.words, { ...fade, duration: 3 })
        .from(authorSplit.chars, { ...fade, duration: 2 }, 1.5)   // starts at 1.5s
        .from(sourceSplit.chars, { ...fade, duration: 2 }, 2.3);  // starts at 2.3s
    });

    return () => mm.revert(); // undoes the splits and animations
  }, { scope: container });
  
  return (
    <section ref={container} className="flex flex-col w-full py-16 px-3 bg-dark-black">
      <blockquote ref={quoteRef} className="mx-auto text-pretty text-2xl text-center tracking-tight leading-7.5 mb-7 text-white tablet:w-120 tablet:leading-8 italic">
        {quote.quote}
        </blockquote>

      <p ref={authorRef} className="mx-auto mb-1.5 text-md text-white leading-none tracking-wide text-center tablet:w-173 tablet:text-lg tablet:mb-2.5">
        {quote.author}
      </p>
      <p ref={sourceRef} className="mx-auto text-xs font-normal text-white leading-none text-center tracking-widest tablet:w-173 tablet:text-sm">
        {quote.source}
      </p>
    </section>
  )
}