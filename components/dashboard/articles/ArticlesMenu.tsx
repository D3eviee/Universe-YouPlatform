"use client"
import { useArticles } from "@/hooks/useDasboardArticles"
import useArticleEditorStore from "@/store/ArticleEditorStore"
import type { Article } from "@/server/schema" 
import { useEffect } from "react"
import AsideMenuContainer from "../AsideMenuContainer"
import ArticleMenuItem from "./ArticleMenuItem"

const ArticlesMenu = () => {
  const { setActiveArticle } = useArticleEditorStore()
  const { data: articles, isLoading, isError, isSuccess} = useArticles()

  useEffect(() => {
    if(isSuccess){
      if(articles && articles.length > 0) setActiveArticle(articles[0])
    } 
  }, [isSuccess, articles, setActiveArticle]) 
  
  return (
    <AsideMenuContainer>
      <input 
        type="search" 
        placeholder="Search all articles" 
        className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"
      />    
      
      {isLoading && <p className="text-gray-400 text-sm animate-bounce py-5">Loading...</p>}
      {isError && <p className="text-red-500 text-sm py-5">There was a problem while loading your articles.</p>}
    
      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {articles?.length === 0 
            ? (<p className="text-gray-400 text-sm">Brak artykułów w bazie.</p>) 
            : articles?.map((article: Article) => <ArticleMenuItem key={article.id} article={article} />)
          }
        </div>
      )}
      
    </AsideMenuContainer>
  )
}

export default ArticlesMenu