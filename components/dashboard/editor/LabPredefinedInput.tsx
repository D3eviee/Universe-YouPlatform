'use client'
import { Component } from "lucide-react";
import { useId } from "react";
import { PREDEFINED_LABS, type PredefinedLabId } from "@/lib/constants/labs";
import { BlockShell } from "./BlockShell";
import { BlockInputProps } from "@/lib/editor/blocks";

export const LabPredefinedInput = ({ id, value, onChange, deleteBlockFn }: BlockInputProps<"lab-predefined">) => {
    const selectId = useId();

    return (
        <BlockShell id={id} title="Predefined lab" icon={<Component aria-hidden="true" size={14} />} onDelete={deleteBlockFn}>
            <div className="px-4 w-full">
                <label htmlFor={selectId} className="sr-only">Choose a lab</label>
                <select
                    id={selectId}
                    className="editor-input w-full cursor-pointer"
                    value={value.moduleName}
                    onChange={(e) => onChange({ moduleName: e.target.value as PredefinedLabId })}
                >
                    <option value="" disabled>Select a predefined lab…</option>
                    {PREDEFINED_LABS.map((lab) => (<option key={lab.id} value={lab.id}>{lab.name}</option>))}
                </select>
            </div>
        </BlockShell>
    )
}