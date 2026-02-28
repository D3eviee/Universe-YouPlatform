'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type HighlightInputProps = {
  onChange: ({}:any) => void
  id: string
  value: { text: string }
}

const HighlightInput = ({onChange, value, id}:HighlightInputProps) => {
  const deleteArticleContentBlock = useArticleEditorStore(store => store.deleteArticleContentBlock)

  const handleHighlightChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = {
      text: e.target.value.trim()
    }
    onChange(newValue)
  }

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="flex flex-row justify-between items-center">
         <label htmlFor={`"highlight-${id}"`} className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase">Highlight</label>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>
       
        <textarea 
          id={`"highlight-${id}"` }
          className="editor-input field-sizing-content w-ful"
          autoFocus 
          placeholder="Highlight for your article"
          value={value.text}
          onChange={e => handleHighlightChange(e)}
        >
        </textarea>
    </div>
  )
}

export default HighlightInput