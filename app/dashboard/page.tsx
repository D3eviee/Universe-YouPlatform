'use client'
import ArticleSettings from "@/components/dashboard/articles/settings/ArticleSettings";
import ArticlesMenu from "@/components/dashboard/articles/ArticlesMenu";
import EquationInput from "@/components/dashboard/inputs/EuqationInput";
import HeadingInput from "@/components/dashboard/inputs/HeadingInput";
import HighlightInput from "@/components/dashboard/inputs/HighlightInput";
import ImageInput from "@/components/dashboard/inputs/ImageInput";
import ParagraphInput from "@/components/dashboard/inputs/ParagraphInput";
import QuoteInput from "@/components/dashboard/inputs/QuoteInput";
import SubtitleInput from "@/components/dashboard/articles/SubtitleInput";
import TitleInput from "@/components/dashboard/articles/TitleInput";
import Toolbar from "@/components/dashboard/articles/toolbar/ArticleToolbar";
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { EditorBlock } from "@/types";

export default function Dashboard() {
  const { activeArticle, updateBlockData, deleteArticleContentBlock } = useArticleEditorStore()
  
  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-row">
      <ArticlesMenu/>
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5 resize-none">
        <section className="w-full h-full flex flex-col mx-2 overflow-hidden">
          <Toolbar/>
          <div className="w-full flex flex-col gap-5 overflow-y-scroll pr-4">
            <TitleInput/>
            <SubtitleInput/>

            <div className="w-full flex flex-col gap-5">
              {activeArticle?.blocks.map(({data, id, type}: EditorBlock) => {
                switch (type) {
                  case "paragraph":
                    return <ParagraphInput 
                      key={id} 
                      id={id} 
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                    />
                  case "heading":
                    return <HeadingInput 
                        key={id} 
                        id={id}  
                        value={data} 
                        onChange={(newValue) => updateBlockData(id, newValue)}
                        deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                      />
                  case "image":
                    return <ImageInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                    />
                  case "quote":
                    return <QuoteInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                    />
                  case "highlight":
                    return <HighlightInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                    />
                  case "equation":
                    return <EquationInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteArticleContentBlock(id)}
                    />
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