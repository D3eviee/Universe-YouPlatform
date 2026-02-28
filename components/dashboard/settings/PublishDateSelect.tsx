const PRIORITIES = ["Draft", "Archive", "Public" ];


const PublishDateSelect = () => {
    const selectedCategory = "Draft"

  return (
    <div className="flex flex-col gap-2 px-2">
        <p className="text-gray-400 font-light tracking-wider text-xs uppercase">STATUS</p>
        <div className="flex flex-row flex-wrap gap-2">
            {PRIORITIES.map( priority => 
                <button 
                    type="button"
                    className={`border-[0.5px] border-focus px-2 py-0.5 text-sm text-white rounded-lg hover:cursor-pointer transition-colors ${selectedCategory === priority ? "bg-[#4085F7] border-transparent" : "bg-transparent"}`}
                    key={priority}
                >
                    {priority}
                </button> 
            )}
        </div>
    </div>
  )
}

export default PublishDateSelect