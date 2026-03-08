"use client"
import useQuoteStore from "@/store/QuoteStore";
import QuoteInput from "./QuoteInput";

const QuoteEditor = () => {
  const { activeQuote, updateQuoteField } = useQuoteStore();
  if(!activeQuote) return 

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <QuoteInput 
          label="Quote" 
          onChange={(newValue) => updateQuoteField("quote", newValue)} value={activeQuote.quote}
          placeholder="Full quote"  
        />
        <QuoteInput 
          label="Quote author"
          onChange={(newValue) => updateQuoteField("author", newValue)} value={activeQuote.author}
          placeholder="Quote Author Fullname"  
        />
        <QuoteInput 
          label="Source" 
          onChange={(newValue) => updateQuoteField("source", newValue)} 
          value={activeQuote.source!}
          placeholder="Source of the quote or author"  
        />
      </div>
    </div>
  );
};

export default QuoteEditor;