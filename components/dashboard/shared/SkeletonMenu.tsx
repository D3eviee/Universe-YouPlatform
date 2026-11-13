export const SkeletonMenu = () => (
  <div role="status" aria-label="Loading" className="flex flex-col">
    {/* SEARCH BAR */}
    <div aria-hidden="true" className="bg-input mb-3 py-3 rounded-lg w-full" />
    {/* MENU ITEMS */}
    <div aria-hidden="true" className="flex flex-col gap-2">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="p-4 bg-[#1e1e20] rounded-xl animate-pulse flex flex-col gap-2.5">
          <div className="h-3.5 bg-[#333336] rounded-md w-full" />
          <div className="h-3.5 bg-[#333336] rounded-md w-5/6" />
          <div className="h-3 bg-[#444448] rounded-md w-1/3 mt-1" />
        </div>
      ))}
    </div>
  </div>
);