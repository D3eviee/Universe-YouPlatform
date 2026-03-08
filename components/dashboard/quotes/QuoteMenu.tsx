"use client"
import { useDashboardQuotes } from "@/hooks/useDashboardQuotes"
import useQuoteStore from "@/store/QuoteStore"
import { Quote } from "@/server/schema"
import { useEffect } from "react"
import AsideMenuContainer from "../AsideMenuContainer"
import QuoteMenuItem from "./QuoteMenuItem"

const QuotesMenu = () => {
  const { setActiveQuote } = useQuoteStore()
  const { data: quotes, isLoading, isError, isSuccess } = useDashboardQuotes()

  useEffect(() => {
    if (isSuccess && quotes && quotes.length > 0) setActiveQuote(quotes[0])
  }, [isSuccess, quotes, setActiveQuote])


  return (
    <AsideMenuContainer>
      <input
        type="search"
        placeholder="Search quotes"
        className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"
      />

      {isLoading && <p className="text-gray-400 text-sm animate-bounce py-5">Loading...</p>}
      {isError && <p className="text-red-500 text-sm py-5">There was a problem while loading your quotes.</p>}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {!quotes || quotes?.length === 0
            ? (<p className="text-gray-400 text-sm">Empty here... let's create so meaningful content</p>)
            : quotes.map((quote: Quote) => <QuoteMenuItem key={quote.id} quote={quote}/> )
          }
        </div>
      )}
    </AsideMenuContainer>
  )
}

export default QuotesMenu