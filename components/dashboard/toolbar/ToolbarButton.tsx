
import useArticleEditorStore from '@/store/ArticleEditorStore'
import { BlockType } from '@/types'
import { ReactNode } from 'react'

const ToolbarButton = ({type, children}:{type:BlockType, children:ReactNode}) => {
  const addArticleContentBlock = useArticleEditorStore(store => store.addArticleContentBlock)
  return (
    <button 
        onClick={() => addArticleContentBlock(type)}
        className="p-1 hover:bg-hover hover:cursor-pointer rounded-lg"
    >
    {children} 
    </button>
  )
}

export default ToolbarButton