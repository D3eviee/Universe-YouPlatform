'use client'
import { Article } from "@/server/schema"
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { EditorArticle } from "@/types"
import { useQueryClient } from "@tanstack/react-query"

const ToolbarAddArticle = () => {
  const queryClient = useQueryClient()
  const setActiveArticle = useArticleEditorStore(store => store.setActiveArticle)

  const handleNewArticle = () => {
    
    const newArticle : EditorArticle = {
      id: crypto.randomUUID(),
      title: "",
      subtitle: "",
      authorId: 1,
      thumbnailImage: "",
      thumbnailAlt: "",
      thumbnailDescription: "",
      thumbnailAnnotaion: "",
      publishedAt: new Date(),
      priority: "normal",
      status: "draft",
      category: "sport",
      createdAt: new Date(),
      slug: "",
      blocks: [],
      isLocalDraft: true, 
    }  

    queryClient.setQueryData(["articles"], (oldArticles: Article[] | undefined) => {
      return oldArticles ? [newArticle, ...oldArticles] : [newArticle];
    })
    setActiveArticle(newArticle)
  }

  return (
    <button 
      onClick={() => handleNewArticle()}
      title="add"
      className="p-1 hover:bg-hover hover:cursor-pointer rounded-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
  </button>
  )
}

export default ToolbarAddArticle