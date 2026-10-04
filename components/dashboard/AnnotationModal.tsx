'use client'
import { useState } from "react"

type AnnotationModalProps = {
  mode: 'create' | 'edit';
  initialTerm: string;
  initialDefinition: string;
  onClose: () => void;
  onSave: (term: string, definition: string) => void;
  onDelete: () => void;
}

export const AnnotationModal = ({ mode, initialTerm, initialDefinition, onClose, onSave,  onDelete }: AnnotationModalProps) => {
  const [term, setTerm] = useState(initialTerm);
  const [definition, setDefinition] = useState(initialDefinition);

  const handleSave = () => {
    if (!term.trim() || !definition.trim()) {
      alert("Add term or definition");
      return;
    }
    onSave(term, definition);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white w-md p-8 rounded-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Annotation</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="ml-3 text-sm font-medium text-secondary-dark">Word</label>
            <input 
              type="text" 
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-3 py-3.5 border border-gray-300 rounded-2xl  outline-none text-sm text-secondary-dark"
              placeholder="What is your term?"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="ml-3 text-sm font-medium text-secondary-dark">Definition</label>
            <textarea 
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full px-3 py-3.5 border border-gray-300 rounded-2xl outline-none min-h-30 resize-none text-sm text-secondary-dark"
              placeholder="Explain or elaborate on topic..."
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4">
          {mode === 'edit' ? (
            <button 
              onClick={onDelete}
              className="bg-red-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Delete
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="bg-gray-100 border-[0.5px] border-gray-200 text-secondary-dark font-semibold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer active:scale-95 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-primary-dark text-white border-[0.5px] border-gray-200  font-semibold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer active:scale-95 hover:bg-theme-dark/90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}