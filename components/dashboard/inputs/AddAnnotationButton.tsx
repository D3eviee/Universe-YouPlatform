'use client'
import { Asterisk } from "lucide-react"

export const AddAnnotationButton = ({onClick}:{onClick: () => void}) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center px-1.5 py-0.5 bg-[#F5F5F5] rounded-lg transition-colors font-medium shadow-sm cursor-pointer hover:bg-white"
    >
      <Asterisk size={18} strokeWidth={1.5} className="text-secondary-dark"/>
    </button>
  )
}