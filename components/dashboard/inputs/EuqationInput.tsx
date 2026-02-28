'use client'

import useArticleEditorStore from "@/store/ArticleEditorStore"
import DeleteInputButton from "./DeleteInputButton"
import { ChangeEvent } from "react"

type EquationInputProps = {
  onChange: (newValue:Object) => void
  id: string
  value: { equationExpression: string; equationCaption: string }
}

const EquationInput = ({onChange, value, id}:EquationInputProps) => {
  const deleteArticleContentBlock = useArticleEditorStore(store => store.deleteArticleContentBlock)

  const handleEquationChange = (fieldType: "equationExpression" | "equationCaption", e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = { [fieldType]: e.target.value } 
    onChange(newValue)
  }
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <div className="flex flex-row justify-between">
         <p className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Equation</p>
         <DeleteInputButton onClick={() => deleteArticleContentBlock(id)}/>
      </div>

      <div className="flex flex-col gap-1 pl-2">
        <div className="w-full">
          <label htmlFor={`equationExpression-${id}`}  className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Expression</label>
          <input 
            id={`equationExpression-${id}`} 
            className="editor-input field-sizing-content w-full"
            placeholder="Equation LaTeX expression"
            value={value.equationExpression}
            onChange={e => handleEquationChange("equationExpression", e)}
          />
          </div>
          <div className="w-full">
            <label htmlFor={`equationCaption-${id}`} className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Caption</label>
            <input 
              id={`equationCaption-${id}`} 
              className="editor-input field-sizing-content w-full"
              placeholder="Tell sometihng about this equation"
              value={value.equationCaption}
              onChange={e => handleEquationChange("equationCaption", e)}
            />
          </div>
        </div>
    </div>
  )
}

export default EquationInput