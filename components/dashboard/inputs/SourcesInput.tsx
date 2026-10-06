'use client'
import { ChangeEvent } from "react"
import { Plus, X } from "lucide-react"
import DeleteInputButton from "./DeleteInputButton"
import useArticleEditorStore from "@/store/ArticleEditorStore" 

type SourcesInputProps = {
  id: string
  value: { sources: string[] } 
}

export const SourcesInput = ({ id, value }: SourcesInputProps) => {
  const updateBlockData = useArticleEditorStore((state) => state.updateBlockData);
  const deleteArticleContentBlock = useArticleEditorStore((state) => state.deleteArticleContentBlock);
  const sources = value?.sources || [];

  // UPDATE SOURCE
  const handleSourceChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newSources = [...sources];
    newSources[index] = e.target.value;
    updateBlockData(id, { sources: newSources });
  }

  // ADD SOURCE
  const handleAddSource = () => { updateBlockData(id, { sources: [...sources, ""] });}

  // DELETE SOURCE
  const handleRemoveSource = (index: number) => {
    const newSources = sources.filter((_, i) => i !== index);
    updateBlockData(id, { sources: newSources });
  }
  
  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center mb-4">
        <label className="text-gray-400 font-light tracking-wider text-xs uppercase">Sources</label>
        <div className="flex flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleAddSource}
            className="flex items-center px-1.5 py-0.5 bg-light-gray rounded-lg transition-colors font-medium shadow-sm cursor-pointer hover:bg-white"
          >  
            <Plus size={18} strokeWidth={1.5} className="text-secondary-dark"/>
          </button>
          <DeleteInputButton onClick={() => deleteArticleContentBlock(id)} />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 px-2">
        {sources.map((source, index) => (
          <div key={index} className="flex flex-row items-center gap-12">
            <div className="flex-1 w-full">
              <label className="text-light-gray font-light tracking-wider text-[10px] px-2 uppercase">Source {index+1}</label>
              <input 
                className="editor-input field-sizing-content w-full"
                placeholder="Book title etc..."
                value={source}
                onChange={e => handleSourceChange(index, e)}
              />
            </div>
            
            <button
              type="button"
              onClick={() => handleRemoveSource(index)}
              className="h-fit flex items-center p-1 bg-light-gray dark rounded-lg transition-colors font-medium shadow-sm cursor-pointer"
              title="Remove source"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}