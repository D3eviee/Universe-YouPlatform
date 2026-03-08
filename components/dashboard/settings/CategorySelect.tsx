import { CATEGORIES_LABELS } from "@/constants/constants";


type CategorySelectProps = {
    selectedCategory: string | null | undefined, 
    onChange: (category: string) => void;
}

const CategorySelect = ({selectedCategory, onChange} : CategorySelectProps ) => {
  return (
    <div className="flex flex-col gap-2 px-2">
        <p className="text-gray-400 font-light tracking-wider text-xs uppercase">CATEGORY</p>
        <div className="flex flex-row flex-wrap gap-2">
            {CATEGORIES_LABELS.map( ({label, value}) => 
                <button 
                    type="button"
                    onClick={() => onChange(value)}
                    className={`border-[0.5px] border-focus px-2 py-0.5 text-sm text-white rounded-lg hover:cursor-pointer transition-colors backdrop-blur-md
                        ${selectedCategory === value ? "bg-blue-600/60 shadow-sm border-transparent" : " bg-transparent"}`
                    }
                    key={value}
                >
                    
                    {label}
                </button> 
            )}
        </div>
    </div>
  )
}

export default CategorySelect