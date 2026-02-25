'use client'

import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type ImageInputProps = {
  onChange: (newValue:Object) => void
  id: string
  value: {imageAnn: string; imageDesc: string; file?: File | null }
}

const ImageInput = ({onChange, value, id}:ImageInputProps) => {
  const deleteArticleContentBlock = useArticleEditorStore(store => store.deleteArticleContentBlock)

  const handleQuoteChange = (fieldType: "quote" | "quoteAuthor" | "authorRole", e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = { [fieldType]: e.target.value } 
    onChange(newValue)
  }
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="flex flex-row justify-between">
         <label htmlFor="quote" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Quote</label>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>

      <div className="flex flex-col gap-1 pl-2">
        <div>
          <label htmlFor="quote" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Quote</label>
          <textarea 
            id="quote" 
            className="editor-input field-sizing-content w-full"
            placeholder="Type quote..."
            value={value}
            onChange={e => handleQuoteChange("quote", e)}
          >
          </textarea>
        </div>

        <div className="flex flex-row">
          <div className="w-full">
            <label htmlFor="quoteAuthor" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Author</label>
            <input 
              id="quoteAuthor" 
              className="editor-input field-sizing-content w-full"
              placeholder="Type quote author..."
              value={value.quoteAuthor}
              onChange={e => handleQuoteChange("quoteAuthor", e)}
              />
          </div>
          <div className="w-full">
            <label htmlFor="authorRole" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Author field</label>
            <input 
              id="authorRole" 
              className="editor-input field-sizing-content w-full"
              placeholder="Type quote author..."
              value={value.authorRole}
              onChange={e => handleQuoteChange("authorRole", e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageInput