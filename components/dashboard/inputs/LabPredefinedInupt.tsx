'use client'
import { DeleteInputButton } from "./DeleteInputButton"
import { Component } from "lucide-react";

const PREDEFINED_LABS = [
  { id: '', name: '--- Select predefined lab ---' },
  { id: 'SequentialTwinTurboLab', name: 'Sequential Twin-Turbo' },
  { id: 'CarHandlingLab', name: "Car Handling Lab" },
  { id: 'TurbochargerLab', name: 'Turbocharger (Flow & Lag)' },
  { id: 'InternalCombustionCycle', name: 'Internal Combustion Cycle' },
  { id: 'EnginePackagingLab', name: 'Engine Layout (V12 vs RWD)' },
];

type LabInputProps = {
  deleteBlockFn: (id: string) => void
  onChange: (newValue: any) => void 
  value: any
  id: string
}

export const LabPredefinedInput = ({ deleteBlockFn, onChange, value, id }: LabInputProps) => {
    const handleSelectChange = (newModuleName: string) => {
        onChange({ moduleName: newModuleName });
    }

    return (
        <div data-block-id={id}  className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
            <div className="px-4 flex flex-row justify-between items-center mb-4">
                <label className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">
                    <Component size={14} /> Predefined Lab 
                </label>
                <DeleteInputButton onClick={() => deleteBlockFn(id)}/>
            </div>
            
            <div className="px-4 w-full">
                <select 
                    className="editor-input w-full cursor-pointer appearance-none"
                    value={value?.moduleName || ''}
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    {PREDEFINED_LABS.map((lab) => (
                        <option key={lab.id} value={lab.id} disabled={lab.id === ''}>
                            {lab.name}
                        </option>
                    ))}
                </select>
            </div>            
        </div>
    )
}