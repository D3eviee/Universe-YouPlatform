import { QuoteEditor } from "@/components/dashboard/quotes/QuoteEditor";
import { QuotesMenu } from "@/components/dashboard/quotes/QuoteMenu";
import { QuoteSaveButton } from "@/components/dashboard/quotes/QuoteSaveButton";
import { QuoteToolbar } from "@/components/dashboard/quotes/QuoteToolbar";

export default function QuotesDashboard() {
  return (
    <div className="w-full h-[calc(100dvh-55px)] flex flex-row">
      <QuotesMenu />
      <main className="flex-1 min-w-0 flex border-l-[0.5px] border-l-black bg-primary-dark p-5">
        <section className="w-full max-w-200 h-full flex flex-col mx-2 overflow-hidden">
          <QuoteToolbar />
          <QuoteEditor />
          <QuoteSaveButton />
        </section>
      </main>
    </div>
  );
}