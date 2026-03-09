const PRIOITY_LABELS: {value:string, label:string}[] = [
    {value:"normal", label: "Normal"},
    {value:"hero1", label: "Hero 1"},
    {value:"hero2", label: "Hero 2"},
    {value:"hero3", label: "Hero 3"},
];

type PrioritySelectProps = {
    selectedPriority: string | null | undefined, 
    onChange: (category: string) => void;
}

const PrioritySelect = ({onChange, selectedPriority}:PrioritySelectProps) => {
    return (
        <div className="flex flex-col gap-2 px-2">
            <p className="text-gray-400 font-light tracking-wider text-xs uppercase">PRIORITY</p>
            <div className="flex flex-row flex-wrap gap-2">
                {PRIOITY_LABELS.map(({label, value}) => 
                    <button 
                        onClick={() => onChange(value)}
                        type="button"
                        className={`border-[0.5px] border-focus px-2 py-0.5 text-sm text-white rounded-lg hover:cursor-pointer transition-colors 
                            ${selectedPriority === value ? "bg-blue-600/60 shadow-sm border-transparent" : "bg-transparent"}`}
                        key={value}
                    >
                        {label}
                    </button> 
                )}
            </div>
        </div>
    )
}

export default PrioritySelect