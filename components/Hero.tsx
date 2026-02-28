'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import HeroCard from "./HeroCard"
import { useCallback, useEffect, useRef, useState } from "react"

const CARDS_COUNT = 3; 

const Hero = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const metrics = useRef({itemWidth: 0, gap: 0})

  const updateMetrics = useCallback(() => {
    const container = scrollContainerRef.current
    if(!container || !container.firstElementChild) return 

    const firstContainerItem = container.firstElementChild as HTMLElement
    const containerStyle = window.getComputedStyle(container)
    const gap = parseInt(containerStyle.gap || '0' , 10)
    
    metrics.current = {
      itemWidth: firstContainerItem.offsetWidth + gap, 
      gap
    }
  }, []) 

  useEffect(() => {
    updateMetrics()
    const resizeObserver = new ResizeObserver(() => updateMetrics())
    if(scrollContainerRef.current){
      resizeObserver.observe(scrollContainerRef.current)
    }
    
    return () => resizeObserver.disconnect()

  }, [updateMetrics])

  const handleScrollEvent = () => {
    const container = scrollContainerRef.current;
    if (!container || metrics.current.itemWidth === 0) return;

    const newIndex = Math.round(container.scrollLeft / metrics.current.itemWidth);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  const slideTo = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { itemWidth } = metrics.current  
    const newIndex = direction === "left" ? Math.max(0, activeIndex - 1) : Math.min(2, activeIndex + 1)

    container.scrollTo({
      left: newIndex * itemWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full flex flex-col gap-4 justify-center pt-8 pb-10 max-w-91.5">
      <div 
        ref={scrollContainerRef} 
        onScroll={handleScrollEvent}
        className="w-110 mx-auto h-110 px-8  flex flex-row gap-3 overflow-x-hidden overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar items-center transition-all duration-700 md:flex-col md:h-full md:w-173"
      >
        <HeroCard/>
        <HeroCard/>
        <HeroCard/> 
      </div>

      <div className="w-110 mx-auto flex flex-row justify-between items-center px-6 md:hidden">
        {/* Dynamiczne Kropki */}
        <div className="flex flex-row gap-3.5 px-5">
          {Array.from({ length: CARDS_COUNT }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 bg-[#161618] ${activeIndex === index ? "opacity-100" : "opacity-30"}`}
            />
          ))}
        </div>

        <div className="flex flex-row gap-2">
          <button 
            className="bg-[#F1F1F4] p-2.5 rounded-full disabled:opacity-30 transition-all duration-300 ease-in-out"
            onClick={() => slideTo('left')}
            disabled={activeIndex == 0}
          >
            <ChevronLeft strokeWidth="2.5px" color="#5B5B60"/>
          </button>

          <button 
            className="bg-[#F1F1F4] p-2.5 rounded-full disabled:opacity-30 transition-all duration-300 ease-in-out" 
            onClick={() => slideTo('right')} 
            disabled={activeIndex == 2}
          >
            <ChevronRight strokeWidth="2.5px" color="#5B5B60"/>
          </button>

        </div>
      </div>
      <button className="text-[#161618] font-semibold bg-[#F5F5F5] h-fit w-fit mx-auto px-6 py-2.5 rounded-2xl mt-3">
        Wyświetl wszystkie
      </button>
    </section>
  )
}

export default Hero