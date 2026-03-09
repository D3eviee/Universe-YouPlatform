'use client'
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type ParagraphInputProps = {
  deleteBlockFn:(id:string) => void
  onChange: ({}:any) => void
  id: string
  value: {text:string}
}

const ParagraphInput = ({deleteBlockFn, onChange, value, id}:ParagraphInputProps) => {
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
         <DeleteInputButton onClick={() => deleteBlockFn(id)}/>
      </div>
       
        <textarea 
          id={`"paragraph-${id}"`}
          className="editor-input field-sizing-content"
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