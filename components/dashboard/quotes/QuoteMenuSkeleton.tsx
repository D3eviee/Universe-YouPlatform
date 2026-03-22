const QuoteMenuSkeleton = () => {
  return (
    <>
      {/* SEARCH BAR SKELETION */}
      <div className="bg-input mb-3 py-3 rounded-lg text-sm w-full"/>
      {/* QUOTES BAR SKELETION */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className="p-4 bg-[#1e1e20] rounded-xl animate-pulse flex flex-col gap-2.5 border border-transparent"
          >
            <div className="h-3.5 bg-[#333336] rounded-md w-full"></div>
            <div className="h-3.5 bg-[#333336] rounded-md w-5/6"></div>
            <div className="h-3 bg-[#444448] rounded-md w-1/3 mt-1"></div>
          </div>
        ))}
      </div>
    </>
  )
}

export default QuoteMenuSkeleton