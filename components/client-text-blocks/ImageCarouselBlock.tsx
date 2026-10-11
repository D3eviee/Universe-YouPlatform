'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image as GalleryImage } from "@/types"; 
import Image from 'next/image';

export const ImageCarouselBlock = ({ data }: {data: { images: GalleryImage[] }}) => {
  const images = data?.images || [];
  if (images.length < 2) return null;

  const [visualIndex, setVisualIndex] = useState(1);
  const [hasTransition, setHasTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const renderImages = [images[images.length - 1], ...images, images[0]];

  const currentIndex = visualIndex === 0 ? images.length - 1
    : visualIndex === images.length + 1 ? 0
    : visualIndex - 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setVisualIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasTransition(true);
    setVisualIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setHasTransition(true);
    setVisualIndex(index + 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (visualIndex === 0) {
      setHasTransition(false);
      setVisualIndex(images.length);
    } else if (visualIndex === images.length + 1) {
      setHasTransition(false);
      setVisualIndex(1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; 
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const offset = visualIndex * 100;

  return (
    <div className="w-full mb-6"> 
      <div className="relative w-full">
        <div 
          className="relative h-59.5 w-100.5 tablet:h-102.5 tablet:w-173 laptop:w-245 laptop:h-145 touch-pan-y mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-full overflow-hidden mobile:rounded-xl tablet:rounded-2xl">
            <div 
              className="flex w-full h-full"
              style={{ 
                transform: `translateX(-${offset}%)`,
                transition: hasTransition ? 'transform 500ms ease-in-out' : 'none' 
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {renderImages.map((img, index) => (
                <div key={`${index}-${img.imageAlt}`} className="relative w-full h-full shrink-0">
                  <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${img.imageFile}`} 
                    alt={img.imageAlt || `Slide ${index + 1}`}
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="hidden tablet:flex absolute -left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center bg-[#F5F5F7] text-spanish-gray hover:text-primary hover:bg-[#E8E8ED] transition-all duration-300 z-10 cursor-pointer shadow-inner"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} strokeWidth={3} className='mr-0.5'/>
          </button>

          <button 
            onClick={nextSlide}
            className="hidden tablet:flex absolute -right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center bg-[#F5F5F7] text-spanish-gray hover:text-primary hover:bg-[#E8E8ED] transition-all duration-300 z-10 cursor-pointer shadow-inner"
            aria-label="Next image"
          >
            <ChevronRight size={24} strokeWidth={3} className='ml-0.5'/>
          </button>
        </div>

      </div>
      
      {/* --- DESCRIPTION --- */}
      <div className="min-h-13.5 tablet:min-h-0 px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 text-pretty text-xxs leading-relaxed text-dark-gray font-semibold mb-1 laptop:mb-4">
        {images.map((img, index) => (
          <p 
            key={`text-${Math.random()}`}
            className={`text-pretty text-xs leading-relaxed text-dark-gray font-semibold transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
          >
            {img.imageDescription}
          </p>
        ))}
      </div>

      {/* --- NAV DOTS --- */}
      <div className="flex items-center justify-center gap-1">
        {images.map((_, index) => (
          <div key={index} className='px-1.5'>
            <button
              key={`${Math.random()}`}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${ index === currentIndex ? 'bg-dark-black' : 'bg-spanish-gray/70'}`}
              aria-label={`Switch to photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}