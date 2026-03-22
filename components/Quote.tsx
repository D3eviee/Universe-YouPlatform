'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

const Quote = ({quote}:{quote:{quote:string, author:string, source:string, }}) => {
  const container = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const positionRef = useRef(null);

  

  useGSAP(() => {
    if (!quoteRef.current || !authorRef.current || !positionRef.current) return;
    const quoteSplit = new SplitText(quoteRef.current, { type: "words" });
    const authorSplit = new SplitText(authorRef.current, { type: "chars" });
    const postitionSplit = new SplitText(positionRef.current, { type: "chars" });
    
    const timeline = gsap.timeline({
      scrollTrigger:{
        trigger:  container.current,
        start: "top 80%",     
      }
    })

    const minorTweenOptions = {
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      stagger: 0.05,
    }

    const mainTween = gsap.from(quoteSplit.words, {
      opacity: 0,
      duration: 3,
      ease: "power3.out",
      stagger: 0.05,
    });

    const authorTween = gsap.from(authorSplit.chars, minorTweenOptions);
    const positionTween = gsap.from(postitionSplit.chars, minorTweenOptions);
  
    timeline.add(mainTween)
    timeline.add(authorTween, "+1.5" )
    timeline.add(positionTween, "+2.3")
    
    return () => {
      quoteSplit.revert();
      authorSplit.revert();
      postitionSplit.revert();
    };

  }, { scope: container });
  
  return (
    <section 
     
      ref={container} 
      className="flex flex-col w-full py-13 px-7 bg-[#161618]"
    >
      <blockquote 
        ref={quoteRef} 
        className="me-auto ms-auto text-pretty font-medium text-2xl text-center tracking-tight leading-7.5 mb-5 text-white tablet:w-120 tablet:leading-8 italic"
      >
        {quote.quote}
      </blockquote>

      <p 
        ref={authorRef} 
        className="me-auto ms-auto mb-1.5 text-md font-medium text-white leading-none text-center tablet:w-173 tablet:text-lg tablet:mb-2.5"
      >
        {quote.author}
      </p>
      <p 
        ref={positionRef} 
        className="me-auto ms-auto text-xs font-normal text-white leading-none text-center tablet:w-173 tablet:text-sm"
      >
        {quote.source}
      </p>
    </section>
  )
}

export default Quote;