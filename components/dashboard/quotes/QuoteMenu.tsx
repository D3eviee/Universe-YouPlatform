"use client"
import { useDashboardQuotes } from "@/hooks/useDashboardQuotes"
import useQuoteStore from "@/store/QuoteStore"
import { Quote } from "@/server/schema"
import { useEffect, useMemo, useRef, useState } from "react"
import AsideMenuContainer from "../AsideMenuContainer"
import QuoteMenuItem from "./QuoteMenuItem"
import SearchInput from "../SearchInput"
import { useDebounce } from "@/hooks/useDebounce"
import QuoteMenuSkeleton from "./QuoteMenuSkeleton"

const QuotesMenu = () => {
  const isMenuInitialized = useRef(false);
  const { setActiveQuote } = useQuoteStore()

  // SEARCH VALUE
  const [ searchTerm, setSearchTerm ] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { data: quotes, isLoading, isError, isSuccess } = useDashboardQuotes()

  const filteredQuotes = useMemo(() => {
    if (!quotes) return [];
    if (!debouncedSearchTerm) return quotes;
    
    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
    
    return quotes.filter(({quote, author}: Quote) => {
      return quote.toLowerCase().includes(lowerCaseTerm) || author.toLowerCase().includes(lowerCaseTerm);
    });
  }, [quotes, debouncedSearchTerm]); 
  
  useEffect(() => {
    if(isSuccess && quotes?.length > 0 && !isMenuInitialized.current) {
      setActiveQuote(quotes[0]);
      isMenuInitialized.current = true;
    }
  }, [isSuccess, quotes, setActiveQuote]);

  return (
    <AsideMenuContainer>
      {isLoading && <QuoteMenuSkeleton/>}
      {isError && <p className="text-red-500 text-sm py-5 ms-auto me-auto">Error occured while loading quotes.</p>}

      {!isLoading && !isError && (
        <>
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search for quote..."
          />

          <div className="flex flex-col gap-2 overflow-y-auto">
            { !filteredQuotes || filteredQuotes.length === 0 ? ( 
              <p className="text-gray-500 text-sm ms-auto me-auto mt-3"> { searchTerm ? "No results" : "Empty here, let's add some content"} </p> )
              : (filteredQuotes.map((quote: Quote) => ( <QuoteMenuItem key={quote.id} quote={quote}/> )))
            }
          </div>
        </>
      )}
      
    </AsideMenuContainer>
  )
}

export default QuotesMenu