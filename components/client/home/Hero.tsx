'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArticleSummary } from "@/types";
import { HeroCard } from "./HeroCard";
import { GoToButton } from "../shared/GoToButton";

export const Hero = ({ articles }: { articles: ArticleSummary[] }) => {
  const count = articles.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Width of one card plus the gap, measured from the DOM (cards are fixed-width per breakpoint)
  const updateMetrics = useCallback(() => {
    const container = scrollContainerRef.current;
    const first = container?.firstElementChild as HTMLElement | null;
    if (!container || !first) return;
    const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
    itemWidthRef.current = first.offsetWidth + gap;
  }, []);

  useEffect(() => {
    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    if (scrollContainerRef.current) observer.observe(scrollContainerRef.current);
    return () => observer.disconnect();
  }, [updateMetrics]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || itemWidthRef.current === 0) return;
    setActiveIndex(Math.round(container.scrollLeft / itemWidthRef.current));
  };

  const slideTo = (index: number) => {
    scrollContainerRef.current?.scrollTo({ left: index * itemWidthRef.current, behavior: "smooth" });
  };

  if (count === 0) return null;

  return (
    <section aria-labelledby="hero-heading" className="w-full flex flex-col justify-center pb-16 mx-auto pt-8 tablet:pt-10 tablet:w-173 laptop:w-245 laptop:pt-12">
      <h1 id="hero-heading" className="section-head ml-7 tablet:ml-0">The Latest</h1>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-[457.5px] gap-3 px-7 flex flex-row items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar tablet:flex-wrap tablet:h-full tablet:px-0 tablet:gap-6 tablet:overflow-visible"
      >
        {articles.map((article) => <HeroCard key={article.id} article={article} />)}
      </div>

      {count > 1 && (
        <div className="w-full flex flex-row justify-between items-center px-7 mt-6 tablet:hidden">
          {/* DOT INDICATORS */}
          <div className="flex flex-row gap-3.5 px-3">
            {articles.map((article, index) => (
              <button
                key={article.id}
                type="button"
                onClick={() => slideTo(index)}
                aria-label={`Go to article ${index + 1} of ${count}`}
                aria-current={activeIndex === index || undefined}
                className={`size-2 rounded-full bg-dark-black transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-30"}`}
              />
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => slideTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous article"
              className="bg-[#F1F1F4] p-2.5 rounded-full disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={2.5} color="#5B5B60" />
            </button>
            <button
              type="button"
              onClick={() => slideTo(Math.min(count - 1, activeIndex + 1))}
              disabled={activeIndex === count - 1}
              aria-label="Next article"
              className="bg-[#F1F1F4] p-2.5 rounded-full disabled:opacity-30 transition-opacity"
            >
              <ChevronRight aria-hidden="true" strokeWidth={2.5} color="#5B5B60" />
            </button>
          </div>
        </div>
      )}

      <GoToButton label="View all" href="/articles" className="bg-light-gray" />
    </section>
  );
};