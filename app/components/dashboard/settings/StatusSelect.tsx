const STATUS_LABELS: {value:string, label:string}[] = [
    {value:"draft", label: "Draft"},
    {value:"public", label: "Public"},
    {value:"archived", label: "Archived"},
];

type StatusSelectProps = {
    selectedStatus: string | null | undefined, 
    onChange: (status: string) => void;
}

const StatusSelect = ({selectedStatus, onChange}:StatusSelectProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
        <p className="text-gray-400 font-light tracking-wider text-xs uppercase">STATUS</p>
        <div className="flex flex-row flex-wrap gap-2">
            {STATUS_LABELS.map( ({label, value}) => 
                <button 
                    onClick={() => onChange(value)}
                    type="button"
                    className={`border-[0.5px] border-focus px-2 py-0.5 text-sm text-white rounded-lg hover:cursor-pointer 
                        ${selectedStatus === value ? "bg-blue-600/60 shadow-sm border-transparent" : "bg-transparent"}`
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

export default StatusSelect