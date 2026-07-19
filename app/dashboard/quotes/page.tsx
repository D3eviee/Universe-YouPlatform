'use client'
import QuoteEditor from "@/components/dashboard/quotes/QuoteEditor";
import QuotesMenu from "@/components/dashboard/quotes/QuoteMenu";
import QuoteSaveButton from "@/components/dashboard/quotes/QuoteSaveButton";
import QuoteToolbar from "@/components/dashboard/quotes/QuoteToolbar";

export default function QuotesDashboard() {
  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-row">
      <QuotesMenu />
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5 resize-none max-w-200">
        <section className="w-full h-full flex flex-col mx-2 overflow-hidden">
          <QuoteToolbar/>
          <QuoteEditor/>
          <QuoteSaveButton/>
        </section>
      </main> 
    </div>
  );
}