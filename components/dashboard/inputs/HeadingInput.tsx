'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type HeadingInputProps = {
  onChange: ({}:any) => void
  id: string
  value: {text:string}
}

const HeadingInput = ({onChange, value, id}:HeadingInputProps) => {
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
         <label htmlFor={`"heading-${id}""`}  className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase">Heading</label>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>
       
        <textarea 
          id={`"heading-${id}"`}
          className="editor-input field-sizing-content w-ful"
          autoFocus 
          placeholder="Heading for your section"
          value={value.text}
          onChange={e => handleParagraphChange(e)}
        >
        </textarea>
    </div>
  )
}

export default HeadingInput