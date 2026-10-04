'use client'
import { LabModuleData} from "@/types";
import DeleteInputButton from "./DeleteInputButton"

type LabInputProps = {
  deleteBlockFn: (id: string) => void
  onChange: (newValue: Object) => void
  id: string
  value: LabModuleData
}

export const LabInput = ({ deleteBlockFn, onChange, value, id }: LabInputProps) => {
    const handlePropChange = (field: keyof LabModuleData["props"], val: string | number) => {
        onChange({...value, props: { ...value.props, [field]: val }})
    }

    return (
        <div data-block-id={id} className="w-full flex flex-col bg-primary py-6 rounded-2xl relative">
            <div className="px-4 flex flex-row justify-between items-center mb-2">
                <label className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase">Lab Module: {value.moduleName}</label>
                <DeleteInputButton onClick={() => deleteBlockFn(id)}/>
            </div>
            
            {value.moduleName === "ProportionalDotGrid" &&
                <div className="w-full flex flex-col gap-4">
                    {/* --- HEADER (TEXTS) --- */}
                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex flex-col">
                            <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Title</label>
                            <input 
                                className="editor-input w-full"
                                placeholder="e.g. Electrical Conductivity Drop"
                                value={value.props.title || ''}
                                onChange={e => handlePropChange("title", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Description</label>
                            <textarea 
                                className="editor-input w-full field-sizing-content"
                                placeholder="Describe the physical phenomenon..."
                                value={value.props.description || ''}
                                onChange={e => handlePropChange("description", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3 px-4">
                        {/* BASE METAL INPUT AND COLOR */}
                        <div className="w-full flex flex-row gap-6 items-center">
                            <div className="w-1/3">
                                <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Base element name</label>
                                <input 
                                    className="editor-input w-full"
                                    placeholder="e.g. Gold (Au)"
                                    value={value.props.baseName || ''}
                                    onChange={e => handlePropChange("baseName", e.target.value)}
                                />
                            </div>

                            <div className="w-1/4">
                                <label className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Base Value</label>
                                <input 
                                    type="number"
                                    step="any"
                                    className="editor-input w-full"
                                    placeholder="59.6"
                                    value={value.props.baseValue ?? ''}
                                    onChange={e => handlePropChange("baseValue", parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="w-30 flex flex-col">
                                <label className="text-gray-400 font-light tracking-wider text-xs pl-1 uppercase">Color</label>
                                <input 
                                    type="color"
                                    className="w-full h-10 cursor-pointer border-none outline-none bg-transparent"
                                    value={value.props.baseColor || '#FBBF24'}
                                    onChange={e => handlePropChange("baseColor", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* ALLOY METAL INPUT AND COLOR */}
                        <div className="w-full flex flex-row gap-6 items-center">
                            <div className="w-1/3">
                                <label className="text-gray-400 font-light tracking-wider text-xs uppercase">Alloy Name</label>
                                <input 
                                    className="editor-input w-full"
                                    placeholder="e.g. Copper (Cu)"
                                    value={value.props.alloyName || ''}
                                    onChange={e => handlePropChange("alloyName", e.target.value)}
                                />
                            </div>

                            <div className="w-1/4">
                            <label className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Max Value (at 100% added)</label>
                            <input 
                                type="number"
                                step="any"
                                className="editor-input w-full"
                                placeholder="20.0"
                                value={value.props.maxValue ?? ''}
                                onChange={e => handlePropChange("maxValue", parseFloat(e.target.value))}
                            />
                            </div>

                            <div className="w-30 flex flex-col">
                                <label className="text-gray-400 font-light tracking-wider text-xs pl-1 uppercase">Color</label>
                                <input 
                                    type="color"
                                    className="w-full h-10 border-none outline-none cursor-pointer bg-transparent"
                                    value={value.props.alloyColor || '#B91C1C'}
                                    onChange={e => handlePropChange("alloyColor", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* PARAMS OF ALLOY */}
                        <div className="flex flex-row items-center gap-8 px-4">
                            <div className="w-1/3">
                                <label className="text-gray-400 font-light tracking-wider text-xs mb-1 uppercase">Metric Name</label>
                                <input 
                                    type="text"
                                    className="editor-input w-full"
                                    placeholder="Conductivity"
                                    value={value.props.metricName || ''}
                                    onChange={e => handlePropChange("metricName", e.target.value)}
                                />
                            </div>

                           <div className="w-1/3">
                                <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Unit</label>
                                <input 
                                    type="text"
                                    className="editor-input w-full"
                                    placeholder="MS/m"
                                    value={value.props.metricUnit || ''}
                                    onChange={e => handlePropChange("metricUnit", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* PERCENTAGE AND MATH MODEL */}
                        <div className="flex flex-row items-center gap-8 px-4">
                            <div className="w-1/3 flex flex-col">
                                <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Max Alloy Percentage (%)</label>
                                <input 
                                    type="number"
                                    className="editor-input w-full"
                                    placeholder="25"
                                    value={value.props.maxPercentage || ''}
                                    onChange={e => handlePropChange("maxPercentage", Number(e.target.value))}
                                />
                            </div>

                            <div className="w-1/3">
                                <label className="text-gray-400 font-light tracking-wider text-xs uppercase mb-1">Math Model</label>
                                <select 
                                    className="editor-input w-full"
                                    value={value.props.mathModel || 'linear'}
                                    onChange={e => handlePropChange("mathModel", e.target.value)}
                                >
                                    <option value="linear">Linear (Proportional)</option>
                                    <option value="square_root">Square Root (Fast start)</option>
                                    <option value="quadratic">Quadratic (Slow start)</option>
                                    <option value="inverse_square">Inverse Square (Drop)</option>
                                </select>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}