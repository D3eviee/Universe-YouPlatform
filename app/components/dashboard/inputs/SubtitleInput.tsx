'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore";

const SubtitleInput = () => {
  const subtitle = useArticleEditorStore(store => store.activeArticle?.subtitle || "");
  const updateArticleField = useArticleEditorStore(store => store.updateArticleField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
        <label htmlFor="subtitle" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Subtitle</label>
        <textarea 
          id="subtitle" 
          className="editor-input field-sizing-content w-full" 
          value={subtitle} 
          placeholder="Subtitle for your article"
          onChange={(e) => {updateArticleField("subtitle", e.target.value)} }
        >
        </textarea>
    </div>
  )
}

export default SubtitleInput