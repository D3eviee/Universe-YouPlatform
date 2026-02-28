'use client'

import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type ParagraphInputProps = {
  onChange: ({}:any) => void
  id: string
  value: {text:string}
}

const ParagraphInput = ({onChange, value, id}:ParagraphInputProps) => {
  const deleteArticleContentBlock = useArticleEditorStore(store => store.deleteArticleContentBlock)

  const handleParagraphChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = {
      text: e.target.value
    }
    onChange(newValue)
  }

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="flex flex-row justify-between items-center">
         <label htmlFor={`"paragraph-${id}""`}  className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase">Paragraph</label>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>
       
        <textarea 
          id={`"paragraph-${id}"`}
          className="editor-input field-sizing-content w-ful"
          autoFocus 
          placeholder="Subtitle for your article"
          value={value.text}
          onChange={e => handleParagraphChange(e)}
        >
        </textarea>
    </div>
  )
}

export default ParagraphInput