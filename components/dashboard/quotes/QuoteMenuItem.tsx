'use client'
import {Quote } from "@/server/schema";
import useQuoteStore from "@/store/QuoteStore";

const QuoteMenuItem = ({quote}:{quote:Quote}) => {
    let { setActiveQuote,  activeQuote} = useQuoteStore();
    const isActive = activeQuote?.id === quote.id
    if(!activeQuote) return 
    const manageDisplay = (activeLabel:string, disabledLabel:string, fallback:string) => {
        let label:string
        if(isActive){
            if(activeLabel == "") label = fallback
            else label = activeLabel
        }
        else  {
            if(disabledLabel == "") label = fallback
            else label = disabledLabel
        }
        return label
    }

  return (
    <div  
        onClick={() => { setActiveQuote(quote)}} 
        className={`flex text-left flex-col gap-1.5 px-7 py-3 rounded-xl sidebar-item-hover ${activeQuote.id === quote.id ? "bg-focus" : "bg-transparent"}`}
    >
        <h2 className="sidebar-item-header line-clamp-2 leading-6 ">{manageDisplay(activeQuote?.quote, quote.quote, "New quote")}</h2>
        <p className="sidebar-item-details leading-4">{manageDisplay(activeQuote?.author, quote.author, "New author")}</p>
    </div>
  )
}

export default QuoteMenuItem