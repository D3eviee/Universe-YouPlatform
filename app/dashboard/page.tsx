'use client'
import { MOCKUP_ARTICLES } from "@/constants/constants";
import ArticlePreview from "../components/dashboard/ArticlePreview";
import SubtitleInput from "../components/dashboard/inputs/SubtitleInput";
import TitleInput from "../components/dashboard/inputs/TitleInput";
import Toolbar from "../components/dashboard/toolbar/Toolbar";
import ArticleSettings from "../components/dashboard/settings/ArticleSettings";
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { Article } from "@/types";
import ParagraphInput from "../components/dashboard/inputs/ParagraphInput";
import QuoteInput from "../components/dashboard/inputs/QuoteInput";
import HighlightInput from "../components/dashboard/inputs/HighlightInput";
import EquationInput from "../components/dashboard/inputs/EuqationInput";
import ImageInput from "../components/dashboard/inputs/ImageInput";

export default function Dashboard() {
  const { articles, updateArticles, activeArticle, updateBlockData } = useArticleEditorStore()
  if(articles.length == 0) updateArticles(MOCKUP_ARTICLES[0])

  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row">
      <aside className="h-full  min-w-80 shrink-0 flex-1 flex-col gap-[0.5px] bg-secondary-dark p-3">
        <input type="search" placeholder="Search all articles" className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full"/>    

        {articles.map((article: Article) => <ArticlePreview key={article.id} article={article}/> )}
      </aside>
      
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5">
        <section className="w-full h-full flex flex-col mx-2">
          <Toolbar/>

          <div className="w-full flex flex-col gap-5 overflow-y-scroll  pr-4">
            <TitleInput/>
            <SubtitleInput />

            <div className="w-full flex flex-col gap-5">
              {activeArticle.blocks.map((block) => {
                switch (block.type) {
                  case "paragraph":
                    return <ParagraphInput key={block.id} id={block.id}  value={block.data} onChange={(newValue) => updateBlockData(block.id, newValue)}/>
                  case "image":
                    return <ImageInput key={block.id} id={block.id}  value={block.data} onChange={(newValue) => updateBlockData(block.id, newValue)}/>
                  case "quote":
                    return <QuoteInput key={block.id} id={block.id}  value={block.data} onChange={(newValue) => updateBlockData(block.id, newValue)}/>
                  case "highlight":
                    return <HighlightInput key={block.id} id={block.id}  value={block.data} onChange={(newValue) => updateBlockData(block.id, newValue)}/>
                  case "equation":
                    return <EquationInput key={block.id} id={block.id}  value={block.data} onChange={(newValue) => updateBlockData(block.id, newValue)}/>
                }
              })}
            </div> 
          </div>
          
          
      </section>

      <ArticleSettings/>
    </main> 
  </div>
  );
}