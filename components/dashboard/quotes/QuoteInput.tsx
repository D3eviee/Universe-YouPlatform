'use client'
import { ChangeEvent } from "react"

type QuoteInputProps = {
  label: string
  onChange: ({}:any) => void
  value: string
  placeholder: string
}

const QuoteInput = ({onChange, value, label, placeholder}:QuoteInputProps) => {
  const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(!e.target) return 
    const newValue = e.target.value
    onChange(newValue)
  }
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      <label htmlFor={label}  className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase px-2">{label}</label>
      
      <textarea 
        id={label}
        className="editor-input field-sizing-content"
        autoFocus 
        placeholder={placeholder}
        value={value}
        onChange={e => handleFieldChange(e)}
      ></textarea>
    </div>
  )
}

export default QuoteInput