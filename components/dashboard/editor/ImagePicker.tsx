'use client';
import { useId } from "react";
import Image from "next/image";
import { useImagePreview } from "@/hooks/useImagePreview";
import { IMAGE_TYPES } from "@/lib/constants/image-uploads";

type ImagePickerProps = {
  value: File | string | null | undefined;
  onSelect: (file: File) => void;
  label?: string;
  className?: string;
};

/** Click to pick an image; shows a preview of a new File or a saved S3 key. */
export const ImagePicker = ({ value, onSelect, label = "image", className = "" }: ImagePickerProps) => {
  const inputId = useId();
  const preview = useImagePreview(value);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-gray-700/50 bg-dark-black focus-within:ring-2 focus-within:ring-focus ${className}`}
    >
      <label htmlFor={inputId} className="group/img absolute inset-0 flex items-center justify-center cursor-pointer">
        {preview ? (
          <>
            <Image src={preview} alt="" fill unoptimized className="object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs font-bold tracking-widest opacity-0 group-hover/img:opacity-100 transition-opacity">
              CHANGE
            </span>
          </>
        ) : (
          <svg aria-hidden="true" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
            <path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          </svg>
        )}
        <span className="sr-only">{preview ? `Change ${label}` : `Choose ${label}`}</span>
      </label>

      <input
        id={inputId}
        type="file"
        accept={IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = ""; // allows picking the same file again after removing it
        }}
      />
    </div>
  );
};