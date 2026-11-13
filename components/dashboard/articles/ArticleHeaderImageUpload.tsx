'use client';
import { useId } from "react";
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { ImagePicker } from "../editor/ImagePicker";

const FIELDS = [
  { field: "thumbnailAlt", label: "Image alt" },
  { field: "thumbnailDescription", label: "Image description" },
  { field: "thumbnailAnnotaion", label: "Image source" },
] as const;

const TextSetting = ({ field, label }: (typeof FIELDS)[number]) => {
  const id = useId();
  const value = useArticleEditorStore((s) => s.activeArticle[field]);
  const update = useArticleEditorStore((s) => s.updateArticleField);
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={id} className="text-gray-200 tracking-wider text-xs">{label}</label>
      <input
        id={id}
        type="text"
        maxLength={field === "thumbnailDescription" ? 2000 : 300}
        className="border rounded-md mt-1 border-focus outline-0 focus:ring-1 focus:ring-focus px-2 py-0.5 text-white text-sm bg-transparent"
        value={value}
        onChange={(e) => update(field, e.target.value)}
      />
    </div>
  );
};

export const ArticleHeaderImageUpload = () => {
  const thumbnailImage = useArticleEditorStore((s) => s.activeArticle.thumbnailImage);
  const update = useArticleEditorStore((s) => s.updateArticleField);

  return (
    <div className="w-full flex flex-col gap-2 px-2">
      <p className="text-gray-400 font-light tracking-wider text-xs uppercase">Header image</p>
      <ImagePicker
        value={thumbnailImage}
        onSelect={(file) => update("thumbnailImage", file)}
        label="header image"
        className="w-full h-45 rounded-2xl"
      />
      {FIELDS.map((f) => <TextSetting key={f.field} {...f} />)}
    </div>
  );
};