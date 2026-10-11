'use client'
import { Image as GalleryImage } from "@/types"
import { DeleteInputButton } from "./DeleteInputButton"
import { ChangeEvent, useState } from "react"
import { Images, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

type GalleryItemRowProps = {
  img: GalleryImage
  index: number
  updateImage: (index: number, field: keyof GalleryImage, val: string | File) => void
  removeImage: (index: number) => void
  blockId: string
}

const GalleryItemRow = ({ img, index, updateImage, removeImage, blockId }: GalleryItemRowProps) => {
  const [blob, setBlob] = useState<string | null>(null)

  const handleTextChange = (field: keyof GalleryImage, e: ChangeEvent<HTMLTextAreaElement>) => {
    updateImage(index, field, e.target.value)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return
    const file = e.target.files[0]
    const imageBlob = URL.createObjectURL(file)
    setBlob(imageBlob)
    updateImage(index, "imageFile", file)
  }

  const inputId = `${blockId}-slide-${index}`
  
  // --- PREVIEW RENDERING --- 
  const getPreviewUrl = () => {
    if (blob) return blob
    if(img.imageSource) return `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${img.imageFile}`;
    return null;
  }

  const previewSrc = getPreviewUrl();
    
  return (
    <div className="flex flex-col gap-3 px-4 py-8 bg-theme-dark rounded-3xl relative group">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center pl-4">
        <span className="text-dark-gray font-bold tracking-widest text-[10px] uppercase">ITEM {index + 1}</span>
        <button 
          onClick={() => removeImage(index)}
          className="bg-red text-white hover:bg-light-red p-1.5 rounded-lg transition-colors cursor-pointer"
          title="Delete photo"
        >
          <Trash2 size={16} strokeWidth={1}/>
        </button>
      </div>

      {/* --- IMAGE CONTENT --- */}
      <div className="w-full flex flex-row gap-4 pl-2">
        {/* --- PHOTO PREVIEW AND UPLOAD */}
        <div className="rounded-3xl flex items-center justify-center border border-gray-700/50 w-80 max-h-60 aspect-video shrink-0 overflow-hidden relative">
          {!previewSrc ? (
            <label htmlFor={`imageInput-${inputId}`} className="w-full h-full rounded-3xl flex items-center bg-dark-black justify-center cursor-pointer hover:bg-white/2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload opacity-50">
                <path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              </svg>
            </label>
          ) : (
            <label htmlFor={`imageInput-${inputId}`} className="relative w-full h-full flex justify-center cursor-pointer group/img">
              <Image 
                src={previewSrc} 
                alt="Preview" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover rounded-3xl" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-widest rounded-2xl">CHANGE</div>
            </label>
          )}
          <input id={`imageInput-${inputId}`} type="file" hidden accept="image/*" onChange={handleFileChange} />
        </div>

        {/* TEXT INPUTS */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <label htmlFor={`imageDescription-${inputId}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Description</label>
            <textarea 
              id={`imageDescription-${inputId}`} 
              className="editor-input field-sizing-content w-full"
              placeholder="Tell something about this image"
              value={img.imageDescription}
              onChange={e => handleTextChange("imageDescription", e)}
            />
          </div>

          <div className="w-full">
            <label htmlFor={`imageAlt-${inputId}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Alt</label>
            <textarea 
              id={`imageAlt-${inputId}`} 
              className="editor-input field-sizing-content w-full"
              placeholder="Fallback text for the image"
              value={img.imageAlt}
              onChange={e => handleTextChange("imageAlt", e)}
            />
          </div>
          
          <div className="w-full">
            <label htmlFor={`imageSource-${inputId}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Source</label>
            <textarea 
              id={`imageSource-${inputId}`} 
              className="editor-input field-sizing-content w-full"
              placeholder="Source of the image"
              value={img.imageSource}
              onChange={e => handleTextChange("imageSource", e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type GalleryInputProps = {
  deleteBlockFn: (id: string) => void
  onChange: (newValue: { images: GalleryImage[] }) => void
  id: string
  value: { images: GalleryImage[] }
}

export const GalleryInput = ({ deleteBlockFn, onChange, value, id }: GalleryInputProps) => {
  const images = value?.images || []

  const handleAddImage = () => {
    const newImage: GalleryImage = { imageSource: "", imageAlt: "", imageDescription: "", imageFile: "" }
    onChange({ images: [...images, newImage] })
  }

  const handleUpdateImage = (index: number, field: keyof GalleryImage, val: string | File) => {
    const updatedImages = [...images]
    updatedImages[index] = { ...updatedImages[index], [field]: val }
    onChange({ images: updatedImages })
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    onChange({ images: updatedImages })
  }

  return (
    <div data-block-id={id} className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      {/* HEADER */}
      <div className="px-4 flex flex-row justify-between items-center mb-4">
        <label className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">
          <Images size={14} /> Gallery
        </label>
        <div className="flex flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center px-1.5 py-0.5 bg-light-gray rounded-lg transition-colors font-medium shadow-sm cursor-pointer hover:bg-white"
          >  
            <Plus size={18} strokeWidth={1.5} className="text-secondary-dark"/>
          </button>
          <DeleteInputButton onClick={() => deleteBlockFn(id)} />
        </div>
      </div>
        
      {/* GALLERY ITEMS */}
      <div className="flex flex-col gap-6 px-2 w-full">
        {images.map((img, index) => (
          <GalleryItemRow 
            key={`${id}-${index}`} 
            img={img} 
            index={index} 
            updateImage={handleUpdateImage} 
            removeImage={handleRemoveImage}
            blockId={id}
          />
        ))}
      </div>
    </div>
  )
}