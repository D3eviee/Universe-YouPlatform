'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore";

const TitleInput = () => {
  const title = useArticleEditorStore(store => store.activeArticle?.title || "");
  const updateArticleField = useArticleEditorStore(store => store.updateArticleField);

  return (
    <div className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl">
    <label htmlFor="title" className="text-gray-400 font-light tracking-wider text-xs px-2 uppercase">Title</label>
    <input 
        type="text" 
        id="title" 
        className="editor-input field-sizing-content" 
        placeholder="Type title here..." 
        value={title}
        onChange={(e) => {updateArticleField("title", e.target.value)} }
    />
</div>
  )
}

export default TitleInput