'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { ChangeEvent, useState } from "react"

const ArticleMainImageUpload = () => {
    const updateArticleField = useArticleEditorStore(store => store.updateArticleField)
    const {thumbnailAlt, thumbnailDesc, thumbnailAnnotaion} = useArticleEditorStore(store => store.activeArticle)
    
    const [ blob, setBlob ] = useState<string | null>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target || !e.target.files) return 
        const imageFile = e.target.files[0]
        const imageBlob = URL.createObjectURL(imageFile)
        updateArticleField("thumbnailImg", imageFile)
        setBlob(imageBlob)
    }

  return (
    <div className="w-full flex flex-col gap-2 px-2">
        <p className="text-gray-400 font-light tracking-wider text-xs uppercase">HEADER IMAGE</p>
        <div className="w-full">
            {!blob ?
                <label htmlFor="fileInput" className="w-full h-45 rounded-2xl flex items-center justify-center bg-hover cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"     strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
                </label>
                :
                <label htmlFor="fileInput" className="h-45 relative w-full rounded-2xl overflow-hidden flex justify-center cursor-pointer">
                    <img src={blob} alt="Podgląd uploadu" className="w-full object-cover"/>
                </label>
            }
            <input id="fileInput" type="file" hidden onChange={handleChange} accept="image/*"/>
        </div>

        <div className="flex flex-col gap-0.5">
            <label className="text-gray-200 font-base tracking-wider text-xs" htmlFor="imageAlt">Image alt</label>
            <input 
                id="imageAlt" 
                type="text"  
                className="border rounded-md mt-1 border-focus outline-0 px-2 py-0.5 text-white text-sm"
                value={thumbnailAlt}
                onChange={(e) => updateArticleField("thumbnailAlt", e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-0.5">
            <label className="text-gray-200 font-base tracking-wider text-xs" htmlFor="imageDesc">Image description</label>
            <input 
                id="imageDesc" 
                type="text"  
                className="border rounded-md mt-1 border-focus outline-0 px-2 py-0.5 text-white text-sm"
                value={thumbnailDesc}
                onChange={(e) => updateArticleField("thumbnailDesc", e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-0.5">
            <label className="text-gray-200 font-base tracking-wider text-xs" htmlFor="imageSrc">Image source</label>
            <input 
                id="imageSrc" 
                type="text" 
                className="border rounded-md mt-1 border-focus outline-0 px-2 py-0.5 text-white text-sm"
                value={thumbnailAnnotaion}
                onChange={(e) => updateArticleField("thumbnailAnnotaion", e.target.value)}
            />
        </div>
    </div>
  )
}

export default ArticleMainImageUpload