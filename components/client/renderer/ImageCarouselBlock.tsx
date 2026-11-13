'use client';
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlockData } from "@/lib/schemas/blocks";
import { imageUrl } from "@/lib/image-url";
import { ClientImage } from "./ClientImage";

const SWIPE_THRESHOLD = 50; // px

export const ImageCarouselBlock = ({ data }: { data: BlockData<"gallery"> }) => {
  // All hooks first, before any return
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Only images that actually have a file
  const slides = data.images.flatMap((img) => {
    const src = imageUrl(img.imageFile);
    return src ? [{ ...img, src }] : [];
  });
  const count = slides.length;

  if (count === 0) return null;
  if (count === 1) return <ClientImage data={slides[0]} />;

  const goTo = (i: number) => setIndex((i + count) % count); // wraps around both ways
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);
  const current = slides[index];

  return (
    <section aria-roledescription="carousel" aria-label="Image gallery" className="w-full mb-6">
      <div
        className="relative mx-auto aspect-4/3 w-full max-w-100.5 tablet:max-w-none tablet:w-173 laptop:w-245 touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-dark-black mobile:rounded-xl tablet:rounded-2xl"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const distance = touchStartX.current - e.changedTouches[0].clientX;
          if (distance > SWIPE_THRESHOLD) next();
          if (distance < -SWIPE_THRESHOLD) prev();
          touchStartX.current = null;
        }}
      >
        <div className="h-full w-full overflow-hidden mobile:rounded-xl tablet:rounded-2xl">
          <div
            className="flex h-full motion-safe:transition-transform motion-safe:duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.imageAlt || ""}
                  fill
                  sizes="(min-width: 1024px) 980px, (min-width: 768px) 692px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="hidden tablet:flex absolute -left-14 top-1/2 -translate-y-1/2 size-11 rounded-full items-center justify-center bg-[#F5F5F7] text-spanish-gray hover:text-primary hover:bg-[#E8E8ED] transition-colors z-10 cursor-pointer shadow-inner"
        >
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={3} className="mr-0.5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="hidden tablet:flex absolute -right-14 top-1/2 -translate-y-1/2 size-11 rounded-full items-center justify-center bg-[#F5F5F7] text-spanish-gray hover:text-primary hover:bg-[#E8E8ED] transition-colors z-10 cursor-pointer shadow-inner"
        >
          <ChevronRight aria-hidden="true" size={24} strokeWidth={3} className="ml-0.5" />
        </button>
      </div>

      {/* CAPTION OF THE CURRENT SLIDE */}
      <div
        aria-live="polite"
        className="min-h-13.5 tablet:min-h-0 px-2 tablet:px-0 w-full max-w-90.5 tablet:max-w-none tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 mb-1 laptop:mb-4 text-pretty text-xs leading-relaxed text-dark-gray font-semibold"
      >
        {current.imageDescription}
        {current.imageSource && <span className="block opacity-70">Source: {current.imageSource}</span>}
      </div>

      {/* DOTS */}
      <div className="flex items-center justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index || undefined}
            className="p-1.5 cursor-pointer"
          >
            <span className={`block size-2 rounded-full transition-colors duration-300 ${i === index ? "bg-dark-black" : "bg-spanish-gray/70"}`} />
          </button>
        ))}
      </div>
    </section>
  );
};