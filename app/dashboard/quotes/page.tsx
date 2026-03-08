'use client'
import QuoteEditor from "@/components/dashboard/quotes/QuoteEditor";
import QuotesMenu from "@/components/dashboard/quotes/QuoteMenu";
import QuoteSettings from "@/components/dashboard/quotes/QuoteSettings";
import QuoteToolbar from "@/components/dashboard/quotes/QuoteToolbar";

export default function QuotesDashboard() {
  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-row">
      <QuotesMenu />
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5 resize-none">
        <section className="w-full h-full flex flex-col mx-2 overflow-hidden">
          <QuoteToolbar/>
          <QuoteEditor/>
        </section>
        <QuoteSettings/>
      </main> 
    </div>
  );
}