'use client'
import BookMenu from "@/components/dashboard/books/BookMenu";
import BookSettings from "@/components/dashboard/books/settings/BookSettings";
import BookToolbar from "@/components/dashboard/books/toolbar/BookToolbar";
import QuoteInput from "@/components/dashboard/inputs/QuoteInput";
import ImageInput from "@/components/dashboard/inputs/ImageInput";
import HeadingInput from "@/components/dashboard/inputs/HeadingInput";
import ParagraphInput from "@/components/dashboard/inputs/ParagraphInput";
import HighlightInput from "@/components/dashboard/inputs/HighlightInput";
import EquationInput from "@/components/dashboard/inputs/EuqationInput";
import { EditorBlock } from "@/types";
import useBookEditorStore from "@/store/BookEditorStore";
import BookTitleInput from "@/components/dashboard/books/BookTitleInput";
import BookAuthorInput from "@/components/dashboard/books/BookAuthorInput";
import BookSubtitleInput from "@/components/dashboard/books/BookSubitlteInput";

export default function BooksDashboard() {
  const { activeBook, updateBlockData, deleteBookContentBlock } = useBookEditorStore()

  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-row">
      <BookMenu/>
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5 resize-none">
        <section className="w-full h-full flex flex-col mx-2 overflow-hidden">
          <BookToolbar/>
          <div className="w-full flex flex-col gap-5 overflow-y-scroll pr-4">
            <BookTitleInput/>
            <BookAuthorInput/>
            <BookSubtitleInput/>

            <div className="w-full flex flex-col gap-5">
              {activeBook?.blocks.map(({data, id, type}:EditorBlock) => {
                switch (type) {
                  case "paragraph":
                    return <ParagraphInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteBookContentBlock(id)}  
                    />
                  case "heading":
                    return <HeadingInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteBookContentBlock(id)} 
                    />
                  case "image":
                    return <ImageInput 
                        key={id} 
                        id={id}  
                        value={data} 
                        onChange={(newValue) => updateBlockData(id, newValue)}
                        deleteBlockFn={(id) => deleteBookContentBlock(id)} 
                      />
                  case "quote":
                    return <QuoteInput 
                      key={id} 
                      id={id}  
                      value={data}
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteBookContentBlock(id)} 
                      />
                  case "highlight":
                    return <HighlightInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteBookContentBlock(id)} 
                    />
                  case "equation":
                    return <EquationInput 
                      key={id} 
                      id={id}  
                      value={data} 
                      onChange={(newValue) => updateBlockData(id, newValue)}
                      deleteBlockFn={(id) => deleteBookContentBlock(id)} 
                    />
                }
              })}
            </div> 
          </div>
        </section>

        <BookSettings/>
      </main>
    </div>
  );
}