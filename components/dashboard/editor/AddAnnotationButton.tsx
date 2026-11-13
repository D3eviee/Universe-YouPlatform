'use client'
import { Asterisk } from "lucide-react"

export const AddAnnotationButton = ({ onClick }:{ onClick: () => void }) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      aria-label="Add comment to annotation text"
      title="Add annotation"
      className="flex items-center px-1.5 py-0.5 bg-light-gray rounded-lg transition-colors font-medium shadow-sm cursor-pointer hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
    >
      <Asterisk size={18} strokeWidth={1.5} className="text-secondary-dark"/>
    </button>
  )
}