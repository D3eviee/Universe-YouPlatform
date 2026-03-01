'use client'
import ContentMenu from "@/components/dashboard/ContentMenu";
import EquationInput from "@/components/dashboard/inputs/EuqationInput";
import HighlightInput from "@/components/dashboard/inputs/HighlightInput";
import ImageInput from "@/components/dashboard/inputs/ImageInput";
import ParagraphInput from "@/components/dashboard/inputs/ParagraphInput";
import QuoteInput from "@/components/dashboard/inputs/QuoteInput";
import SubtitleInput from "@/components/dashboard/inputs/SubtitleInput";
import TitleInput from "@/components/dashboard/inputs/TitleInput";
import ArticleSettings from "@/components/dashboard/settings/ArticleSettings";
import Toolbar from "@/components/dashboard/toolbar/Toolbar";
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { EditorBlock } from "@/types";

export default function Dashboard() {
  const { activeArticle, updateBlockData } = useArticleEditorStore()

  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row">
      <ContentMenu/>
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5">
        <section className="w-full h-full flex flex-col mx-2">
          <Toolbar/>

          <div className="w-full flex flex-col gap-5 overflow-y-scroll  pr-4">
            <TitleInput/>
            <SubtitleInput/>

            <div className="w-full flex flex-col gap-5">
              {activeArticle?.blocks.map((block: EditorBlock) => {
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