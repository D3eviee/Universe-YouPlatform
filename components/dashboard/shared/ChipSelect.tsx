'use client';
import { useId } from "react";

type Option<T extends string> = { value: T; label: string };

type ChipSelectProps<T extends string> = {
  label: string;
  options: readonly Option<T>[];
  selected: T | null | undefined;
  onChange: (value: T) => void;
};

/** A single-choice list shown as chips. Behaves like a group of radio buttons. */
export function ChipSelect<T extends string>({ label, options, selected, onChange }: ChipSelectProps<T>) {
    const labelId = useId();
    
    return (
        <div className="flex flex-col gap-2 px-2">
            <p id={labelId} className="text-gray-400 font-light tracking-wider text-xs uppercase">{label}</p>
            <div role="radiogroup" aria-labelledby={labelId} className="flex flex-row flex-wrap gap-2">
                {options.map(({ value, label }) => {
                    const isSelected = selected === value;
                    return (
                        <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => onChange(value)}
                            className={`border-[0.5px] px-2 py-0.5 text-sm text-white rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-focus 
                                ${isSelected ? "bg-blue-600/60 shadow-sm border-transparent" : "bg-transparent border-focus"}`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}