'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent, useState } from "react"

type ImageInputProps = {
  onChange: (newValue:Object) => void
  id: string
  value: {imageSource: string, imageDescription: string, imageAlt:string,  imageFile?: File | null }
}

const ImageInput = ({onChange, value, id}:ImageInputProps) => {
  const deleteArticleContentBlock = useArticleEditorStore(store => store.deleteArticleContentBlock)
  const [ blob, setBlob ] = useState<string | null>()

  const handleQuoteChange = (fieldType: "imageAlt" | "imageSource" | "imageDescription", e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = { [fieldType]: e.target.value } 
    onChange(newValue)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target || !e.target.files) return 
    const imageFile = e.target.files[0]
    const imageBlob = URL.createObjectURL(imageFile)
    const newValue = { ["imageFile"]: imageFile } 
    onChange(newValue)
    setBlob(imageBlob)
  }
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="flex flex-row justify-between">
         <label htmlFor="quote" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Quote</label>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>

      <div className="w-full flex flex-row gap-4 pl-2">
          <div className="w-full rounded-2xl flex items-center justify-center">
              {!blob ?
                  <label htmlFor={`imageInput-${id}`} className="w-full h-full rounded-2xl flex items-center bg-secondary-dark justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"     strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
                  </label>
                  :
                  <label htmlFor={`imageInput-${id}`} className="relative w-fit flex justify-center cursor-pointer">
                      <img src={blob} alt="Podgląd uploadu" className="w-full object-cover rounded-2xl max-h-60"/>
                  </label>
              }
            <input id={`imageInput-${id}`} type="file" hidden accept="image/*" onChange={handleImageChange}/>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full">
              <label htmlFor={`imageAlt-${id}`}  className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Author</label>
              <input 
                id={`imageAlt-${id}`} 
                className="editor-input field-sizing-content w-full"
                placeholder="Fallback text for the image"
                value={value.imageAlt}
                onChange={e => handleQuoteChange("imageAlt", e)}
                />
            </div>
            <div className="w-full">
              <label htmlFor={`imageDescription-${id}`} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Author</label>
              <input 
                id={`imageDescription-${id}`} 
                className="editor-input field-sizing-content w-full"
                placeholder="Tell something about this image"
                value={value.imageDescription}
                onChange={e => handleQuoteChange("imageDescription", e)}
                />
            </div>
            <div className="w-full">
              <label htmlFor={`imageSource-${id}`} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Author field</label>
              <input 
                id={`imageSource-${id}`} 
                className="editor-input field-sizing-content w-full"
                placeholder="Source of the image"
                value={value.imageSource}
                onChange={e => handleQuoteChange("imageSource", e)}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageInput