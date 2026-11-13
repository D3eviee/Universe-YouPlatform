'use client';
import { Images, Plus, Trash2 } from "lucide-react";
import type { EditorImage } from "@/lib/schemas/blocks";
import { DeleteInputButton } from "./DeleteInputButton";
import { ImagePicker } from "./ImagePicker";
import { ImageMetaFields } from "./ImageMetaFields";

const emptyImage = (): EditorImage => ({ imageDescription: "", imageAlt: "", imageSource: "", imageFile: "" });

type GalleryInputProps = {
  id: string;
  value: { images: EditorImage[] };
  onChange: (patch: { images: EditorImage[] }) => void;
  deleteBlockFn: (id: string) => void;
};

export const GalleryInput = ({ id, value, onChange, deleteBlockFn }: GalleryInputProps) => {
  const images = value.images ?? [];

  const update = (index: number, patch: Partial<EditorImage>) =>
    onChange({ images: images.map((img, i) => (i === index ? { ...img, ...patch } : img)) });

  const remove = (index: number) => onChange({ images: images.filter((_, i) => i !== index) });

  const add = () => onChange({ images: [...images, emptyImage()] });

  return (
    <div data-block-id={id} className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="px-4 flex flex-row justify-between items-center mb-4">
        <span className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">
          <Images aria-hidden="true" size={14} /> Gallery
        </span>
        <div className="flex flex-row items-center gap-3">
          <button
            type="button"
            onClick={add}
            aria-label="Add image to gallery"
            title="Add image"
            className="flex items-center px-1.5 py-0.5 bg-light-gray rounded-lg font-medium shadow-sm cursor-pointer hover:bg-white transition-colors"
          >
            <Plus aria-hidden="true" size={18} strokeWidth={1.5} className="text-secondary-dark" />
          </button>
          <DeleteInputButton label="Delete gallery block" onClick={() => deleteBlockFn(id)} />
        </div>
      </div>

      <ol className="flex flex-col gap-6 px-2 w-full">
        {images.map((img, index) => (
          <li key={index} className="flex flex-col gap-3 px-4 py-8 bg-theme-dark rounded-3xl">
            <div className="flex justify-between items-center pl-4">
              <span className="text-dark-gray font-bold tracking-widest text-[10px] uppercase">Item {index + 1}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove image ${index + 1}`}
                title="Remove image"
                className="bg-red text-white hover:bg-light-red p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 aria-hidden="true" size={16} strokeWidth={1} />
              </button>
            </div>

            <div className="w-full flex flex-row gap-4 pl-2">
              <ImagePicker
                value={img.imageFile}
                onSelect={(file) => update(index, { imageFile: file })}
                label={`image ${index + 1}`}
                className="w-80 aspect-video max-h-60 shrink-0"
              />
              <ImageMetaFields value={img} onChange={(field, text) => update(index, { [field]: text })} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};