'use client';
import { useId } from "react";
import type { EditorImage } from "@/lib/schemas/blocks";

type MetaField = "imageDescription" | "imageAlt" | "imageSource";

const FIELDS: { field: MetaField; label: string; placeholder: string }[] = [
  { field: "imageDescription", label: "Description", placeholder: "Tell something about this image" },
  { field: "imageAlt", label: "Alt", placeholder: "Describe the image for screen readers" },
  { field: "imageSource", label: "Source", placeholder: "Source of the image" },
];

/** The three text fields every image has. */
export const ImageMetaFields = ({
  value,
  onChange,
}: {
  value: Pick<EditorImage, MetaField>;
  onChange: (field: MetaField, text: string) => void;
}) => {
  const baseId = useId();

  return (
    <div className="w-full flex flex-col gap-3">
      {FIELDS.map(({ field, label, placeholder }) => (
        <div key={field} className="w-full">
          <label htmlFor={`${baseId}-${field}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">
            {label}
          </label>
          <textarea
            id={`${baseId}-${field}`}
            className="editor-input field-sizing-content w-full"
            placeholder={placeholder}
            value={value[field]}
            onChange={(e) => onChange(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};