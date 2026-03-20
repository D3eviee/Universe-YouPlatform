'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import HeroCard from "./HeroCard"
import { useCallback, useEffect, useRef, useState } from "react"
import GoToButton from "./GoToButton"

type Article = {
  id: string
  slug: string,
  title: string
  thumbnailAlt: string
  thumbnailImage: string
  category: string | null
  publishedAt: Date,
}

const CARDS_COUNT = 3; 

const Hero = ({articles}:{articles: Article[]}) => {
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
    <section className="w-full flex flex-col gap-3 justify-center mt-8 pb-10 me-auto ms-auto tablet:gap-8 tablet:pt-10 tablet:w-173 laptop:w-245 laptop:pt-12">
      <div 
        ref={scrollContainerRef} 
        onScroll={handleScrollEvent}
        className="w-100 h-[457.5px] gap-3 mx-auto overflow-auto px-7 flex flex-row overflow-x-hidden overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar items-center transition-all duration-700 tablet:w-full tablet:flex-wrap tablet:h-full tablet:px-0 tablet:gap-6"   
      >
        {articles.map(article => <HeroCard key={article.id} article={article}/> )}
      </div>

      <div className="w-full mx-auto flex flex-row justify-between items-center px-7 tablet:hidden" >
        {/* DOT INDICATORS */}
        <div className="flex flex-row gap-3.5 px-3">
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

       <GoToButton label="More to Read" to="/articles" styles="bg-[#F5F5F5]"/>
    </section>
  )
}

export default Hero