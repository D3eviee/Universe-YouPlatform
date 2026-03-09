'use client'
import useArticleEditorStore from '@/store/ArticleEditorStore'
import useBookEditorStore from '@/store/BookEditorStore'
import { BlockType } from '@/types'
import { ReactNode } from 'react'

const ToolbarButton = ({type, children, store}:{type:BlockType, children:ReactNode, store: "articles" | "books"}) => {
  const addArticleContentBlock = useArticleEditorStore(store => store.addArticleContentBlock)
  const addBookContentBlock = useBookEditorStore(store => store.addBookContentBlock)

  return (
    <button 
        onClick={() => store === "articles" ? addArticleContentBlock(type) : addBookContentBlock(type)}
        className="p-1 hover:bg-hover hover:cursor-pointer rounded-lg"
    >
    {children} 
    </button>
  )
}

export default ToolbarButton