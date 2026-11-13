'use client';
import { Image as ImageIcon } from "lucide-react";
import type { EditorImage } from "@/lib/schemas/blocks";
import { ImagePicker } from "./ImagePicker";
import { ImageMetaFields } from "./ImageMetaFields";
import { DeleteInputButton } from "./DeleteInputButton";

type ImageInputProps = {
  id: string;
  value: EditorImage;
  onChange: (patch: Partial<EditorImage>) => void;
  deleteBlockFn: (id: string) => void;
};

export const ImageInput = ({ id, value, onChange, deleteBlockFn }: ImageInputProps) => (
  <div data-block-id={id} className="w-full flex flex-col bg-primary px-4 py-6 rounded-2xl">
    <div className="px-2 flex flex-row justify-between items-center mb-4">
      <span className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">
        <ImageIcon aria-hidden="true" size={14} /> Image
      </span>
      <DeleteInputButton label="Delete image block" onClick={() => deleteBlockFn(id)} />
    </div>

    <div className="flex flex-row gap-3 px-6 py-8 bg-theme-dark rounded-3xl">
      <ImagePicker
        value={value.imageFile}
        onSelect={(file) => onChange({ imageFile: file })}
        className="w-80 aspect-video max-h-60 shrink-0"
      />
      <ImageMetaFields value={value} onChange={(field, text) => onChange({ [field]: text })} />
    </div>
  </div>
);