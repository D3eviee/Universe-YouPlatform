"use client"
import { useDashboardQuotes } from "@/hooks/useDashboardQuotes"
import useQuoteStore, { toDraft } from "@/store/QuoteStore"
import { Quote } from "@/server/schema"
import { useEffect, useMemo, useRef, useState } from "react"
import { AsideMenuContainer } from "../shared/AsideMenuContainer"
import { QuoteMenuItem } from "./QuoteMenuItem"
import { SearchInput } from "../shared/SearchInput"
import { useDebounce } from "@/hooks/useDebounce"
import { SkeletonMenu } from "../shared/SkeletonMenu"
import { useIsQuoteSaved } from "@/hooks/useIsQuoteSaved";

export const QuotesMenu = () => {
  const { data: quotes = [], isLoading, isError, isSuccess } = useDashboardQuotes();
  const selectQuote = useQuoteStore((s) => s.selectQuote);
  const activeId = useQuoteStore((s) => s.activeQuote?.id);
  const isSaved = useIsQuoteSaved();

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredQuotes = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return quotes;
    return quotes.filter(
      ({ quote, author }) => quote.toLowerCase().includes(term) || author.toLowerCase().includes(term),
    );
  }, [quotes, debouncedSearchTerm]);


  // OPEN THE FIRST QUOTE ONCE, WHEN THE LIST FIRST LOADS
  const isMenuInitialized = useRef(false);
  useEffect(() => {
    if (isMenuInitialized.current || !isSuccess) return;
    isMenuInitialized.current = true;
    if (quotes.length > 0) selectQuote(toDraft(quotes[0]));
  }, [isSuccess, quotes, selectQuote]);

  // SWITCHING QUOTES: ASK BEFORE THROWING AWAY UNSAVED EDITS
  const handleSelect = (quote: Quote) => {
    if (quote.id === activeId) return;
    if (!isSaved && !confirm("You have unsaved changes. Discard them?")) return;
    selectQuote(toDraft(quote));
  };

  return (
    <AsideMenuContainer>
      {isLoading && <SkeletonMenu/>}
      {isError &&  <p role="alert" className="text-red-500 text-sm py-5 text-center"> Error occured while loading quotes.</p>}

      {isSuccess && (
        <>
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search for quote..."
          />

          <div className="grid grid-cols-2 gap-2">
             {filteredQuotes.length === 0 ? (
              <p className="col-span-2 text-gray-500 text-sm text-center mt-3"> {debouncedSearchTerm ? "No results" : "Empty here, let's add some content"} </p> )
              : (filteredQuotes.map((quote) => ( <QuoteMenuItem key={quote.id} quote={quote} onSelect={() => handleSelect(quote)} /> )))
            }
          </div>
        </>
      )} 
    </AsideMenuContainer>
  )
}