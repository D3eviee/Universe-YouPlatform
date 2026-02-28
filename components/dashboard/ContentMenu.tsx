"use client"
import { useArticles } from "@/hooks/useDasboardArticles"
import ArticlePreview from "./ArticlePreview"
import useArticleEditorStore from "@/store/ArticleEditorStore"
import type { Article } from "@/server/schema" 
import { useEffect } from "react"

const ContentMenu = () => {
  const { setActiveArticle } = useArticleEditorStore()
  const { data: articles, isLoading, isError, isSuccess} = useArticles()

  useEffect(() => {
    if(isSuccess){
      if (articles && articles.length > 0 ) {
        setActiveArticle(articles[0])
      }
    }
  }, [isSuccess, articles, setActiveArticle]) 
      
  return (
    <aside className="h-full min-w-80 shrink-0 flex-1 flex-col gap-[0.5px] bg-secondary-dark p-3 overflow-scroll">
      <input 
        type="search" 
        placeholder="Search all articles" 
        className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"
      />    
      
      {isLoading && <p className="text-gray-400 text-sm animate-bounce">Loading...</p>}
      {isError && <p className="text-red-500 text-sm">Błąd pobierania danych.</p>}
    
      {!isLoading && !isError && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {articles?.length === 0 
            ? (<p className="text-gray-400 text-sm">Brak artykułów w bazie.</p>) 
            : articles?.map((article: Article) => <ArticlePreview key={article.id} article={article} />)
          }
        </div>
      )}
    </aside>
  )
}

export default ContentMenu