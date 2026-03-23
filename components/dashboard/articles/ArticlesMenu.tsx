"use client"
import { useArticles } from "@/hooks/useDasboardArticles"
import useArticleEditorStore from "@/store/ArticleEditorStore"
import type { Article } from "@/server/schema" 
import { useEffect, useMemo, useRef, useState } from "react"
import AsideMenuContainer from "../AsideMenuContainer"
import ArticleMenuItem from "./ArticleMenuItem"
import { useDebounce } from "@/hooks/useDebounce"
import SkeletonMenu from "@/components/SkeletonMenu"
import SearchInput from "../SearchInput"

const ArticlesMenu = () => {
  const isMenuInitialized = useRef(false);
  const { setActiveArticle } = useArticleEditorStore()

  // SEARCH VALUE
  const [ searchTerm, setSearchTerm ] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const { data: articles, isLoading, isError, isSuccess} = useArticles()

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (!debouncedSearchTerm) return articles;
    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
    
    return articles.filter(({category, subtitle, title}: Article) => {
      return title.toLowerCase().includes(lowerCaseTerm) || category?.toLowerCase().includes(lowerCaseTerm) ||  subtitle.toLowerCase().includes(lowerCaseTerm)
    });
  }, [articles, debouncedSearchTerm]); 

  useEffect(() => {
    if(isSuccess && articles?.length > 0 && !isMenuInitialized.current) {
      setActiveArticle(articles[0]);
      isMenuInitialized.current = true;
    }
  }, [isSuccess, articles, setActiveArticle]);
  
  return (
    <AsideMenuContainer> 
      {isLoading && <SkeletonMenu/> } 
      {isError && <p className="text-red-500 text-sm py-5 ms-auto me-auto">Error occured while loading articles.</p>}

      {!isLoading && !isError && (
        <>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm} 
            placeholder="Search for article..."
          />

          <div className="flex flex-col gap-2 overflow-y-auto">
            { !filteredArticles || filteredArticles.length === 0 ? ( 
              <p className="text-gray-500 text-sm ms-auto me-auto mt-3"> { searchTerm ? "No results" : "Empty here, let's add some content"} </p> )
              : (filteredArticles.map((article: Article) => ( <ArticleMenuItem key={article.id} article={article}/> )))
            }
          </div>
        </>
      )}      
    </AsideMenuContainer>
  )
}

export default ArticlesMenu