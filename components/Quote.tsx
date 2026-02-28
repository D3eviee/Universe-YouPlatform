'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // Recommended hook
import { SplitText } from "gsap/SplitText"; // Ensure correct import path

gsap.registerPlugin(SplitText, useGSAP);

const Quote = () => {
  const container = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const positionRef = useRef(null);

  useGSAP(() => {
    if(!quoteRef || !authorRef || !positionRef ) return
    const quoteSplit = new SplitText(quoteRef.current, { type: "words" });
    const authorSplit = new SplitText(authorRef.current, { type: "chars" });
    const postitionSplit = new SplitText(positionRef.current, { type: "chars" });
    
    const timeline = gsap.timeline()

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

  }, { scope: container });

  return (
    <section ref={container} className="w-full py-8 flex flex-col justify-center items-center p-8 bg-[white] text-black">
      <blockquote 
        ref={quoteRef} 
        className="text-pretty font-semibold text-2xl text-center tracking-tight leading-7 mb-3"
      >
        Your time is limited, so don't waste it living someone else's life.
      </blockquote>
      <p ref={authorRef} className="text-balance font-medium mb-0.5">Steve Jobs</p>
      <p ref={positionRef}  className="text-xs font-base">Apple Founder</p>
    </section>
  )
}

export default Quote;