'use client'
import { Image as GalleryImage } from "@/types"
import { DeleteInputButton } from "./DeleteInputButton"
import { ChangeEvent, useState } from "react"
import { Image as ImageIcon } from "lucide-react"
import Image from "next/image"

type ImageInputProps = {
  deleteBlockFn:(id:string) => void
  onChange: (newValue:Object) => void
  id: string
  value: GalleryImage
}

export const ImageInput = ({deleteBlockFn, onChange, value, id}:ImageInputProps) => {
  const [ blob, setBlob ] = useState<string | null>()

  const handleInputChange = (field: keyof GalleryImage, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = { [field]: e.target.value } 
    onChange(newValue)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target || !e.target.files) return 
    const imageFile = e.target.files[0]
    const imageBlob = URL.createObjectURL(imageFile)
    const newValue = { ["imageFile"]: imageFile } 
    onChange(newValue)
    setBlob(imageBlob)
  }

  // --- PREVIEW RENDERING --- 
  const getPreviewUrl = () => {
    if (blob) return blob
    if(value.imageSource) return `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${value.imageFile}`;
    return null;
  }
  
  const previewSrc = getPreviewUrl();
  
  return (
    <div data-block-id={id} className="w-full flex flex-col bg-primary px-4 py-6 rounded-2xl">
      <div className="px-2 flex flex-row justify-between items-center mb-4">
         <label className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">
          <ImageIcon size={14} /> Image
        </label>
         <DeleteInputButton onClick={() => deleteBlockFn(id)}/>
      </div>

      <div className="flex flex-row gap-3 px-6 py-8 bg-theme-dark rounded-3xl relative group">
        <div className="rounded-3xl flex items-center justify-center border border-gray-700/50 w-80 max-h-60 aspect-video shrink-0 overflow-hidden relative">
          {!previewSrc ? (
            <label htmlFor={`imageInput-${id}`} className="w-full h-full rounded-3xl flex items-center bg-dark-black justify-center cursor-pointer hover:bg-white/2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload opacity-50">
                <path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              </svg>
            </label>
          ) : (
            <label htmlFor={`imageInput-${id}`} className="relative w-full h-full flex justify-center cursor-pointer group/img">
              <Image 
                src={previewSrc} 
                alt="Preview" 
                fill 
                className="w-full h-full object-cover rounded-3xl" 
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold tracking-widest rounded-2xl">CHANGE</div>
            </label>
          )}
            <input id={`imageInput-${id}`} type="file" hidden accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
              <label htmlFor={`imageDescription-${id}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Description</label>
              <textarea 
                id={`imageDescription-${id}`} 
                className="editor-input field-sizing-content"
                placeholder="Tell something about this image"
                value={value.imageDescription}
                onChange={e => handleInputChange("imageDescription", e)}>
                </textarea>
            </div>
            
            <div className="w-full">
              <label htmlFor={`imageAlt-${id}`}  className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Alt</label>
              <textarea 
                id={`imageAlt-${id}`} 
                className="editor-input field-sizing-content"
                placeholder="Fallback text for the image"
                value={value.imageAlt}
                onChange={e => handleInputChange("imageAlt", e)}
                ></textarea>
            </div>
            
            <div className="w-full">
              <label htmlFor={`imageSource-${id}`} className="text-dark-gray font-light tracking-wider text-xs px-2 uppercase">Source</label>
              <textarea 
                id={`imageSource-${id}`} 
                className="editor-input field-sizing-content"
                placeholder="Source of the image"
                value={value.imageSource}
                onChange={e => handleInputChange("imageSource", e)}
              ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}