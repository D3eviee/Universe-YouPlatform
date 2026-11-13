import { QuoteToolbarAdd } from "./QuoteToolbarAdd";
import { QuoteToolbarDelete } from "./QuoteToolbarDelete";
import { QuoteToolbarSaveIndicator } from "./QuoteToolbarSaveIndicator";

export const QuoteToolbar = () => (
  <div role="toolbar" aria-label="Quote actions" className="w-full flex flex-row justify-between mb-8">
    <QuoteToolbarDelete />
    <div className="flex flex-row items-center">
      <QuoteToolbarSaveIndicator />
      <QuoteToolbarAdd />
    </div>
  </div>
);