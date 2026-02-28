'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { Article } from "@/types"

const ArticlePreview = ({article}:{article:Article}) => {
    let { activeArticle,  setActiveArticle} = useArticleEditorStore();

    const isActive = activeArticle.id === article.id

    const manageDisplay = (activeLabel:string, disabledLabel:string, fallback:string) => {
        let label:string
        if(isActive){
            if(activeLabel == "") label = fallback
            else label = activeLabel
        }
        else  {
            if(disabledLabel == "") label = fallback
            else label = disabledLabel
        }

        return label
    }

  return (
    <div  
        onClick={() => { setActiveArticle(article)}} 
        className={`flex text-left flex-col gap-2 px-7 py-3 rounded-xl sidebar-item-hover ${activeArticle.id === article.id ? "bg-focus" : "bg-transparent"}`}
    >
        <h2 className="sidebar-item-header">{manageDisplay(activeArticle.title, article.title, "New article")}</h2>
        <p className="sidebar-item-details leading-4">{manageDisplay(activeArticle.subtitle, article.subtitle, "No content provided")}</p>
        <div className="flex flex-row gap-2 mt-0.5">
            <p className="sidebar-item-details px-1  bg-gray-600 rounded-md">{!activeArticle.publishedAt ? article.publishedAt.toLocaleDateString('en-EN') : activeArticle.publishedAt.toLocaleDateString('en-EN')}</p>
            <p className="sidebar-item-details px-1 bg-[#5A0C9F] rounded-md">{isActive ? activeArticle.category : article.category}</p>
        </div>
    </div>
  )
}

export default ArticlePreview