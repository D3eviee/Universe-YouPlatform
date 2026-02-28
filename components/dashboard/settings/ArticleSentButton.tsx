'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { useState } from "react"

const ArticleSentButton = () => {
    const [saving, setSaving] = useState(false)
    const {title, subtitle, status, category, thumbnailAlt, thumbnailImg, thumbnailDesc, id, thumbnailAnnotaion, authorId, priority, blocks, publishedAt } = useArticleEditorStore(store => store.activeArticle)
    const label = status == "Draft" ? "Save draft" : "Save"
    
    const handleSave = async () => {
        setSaving(true)
        if(!title || !subtitle || !category || !status || !thumbnailImg || !thumbnailDesc || !thumbnailAlt || !authorId || !publishedAt || !blocks) return 

        const formData = new FormData();;
        formData.append("id",  id);
        formData.append("authorId", authorId.toString());
        formData.append("title",  title);
        formData.append("subtitle",  subtitle);
        formData.append("status",  status);
        formData.append("category",  category);
        formData.append("thumbnailFile",  thumbnailImg);
        formData.append("thumbnailDescription",  thumbnailDesc);
        formData.append("thumbnailAlt",  thumbnailAlt);
        formData.append("thumbnailAnnotaion",  thumbnailAnnotaion);
        formData.append("priority",  priority);
        formData.append("publishedAt",  publishedAt.toISOString());
        
        const imagesBlock = blocks.filter((block) => block.type == "image")
        imagesBlock.forEach(block => {
            if(!block.data.imageFile) return 
            formData.append(`image-${block.id}`,  block.data.imageFile);
        })

        formData.append("blocks", JSON.stringify(blocks))

        try{
            const response = await fetch("/api/dashboard/articles", {
                method: "POST", 
                body: formData
            })

            if(response.ok){
                setSaving(false)
            }
        }catch(error){
            setSaving(false)
            console.log(error)
        }    
    }


    return (
        <button 
            onClick={handleSave}
            type="button"
            disabled={saving}
            className="py-2 rounded-xl bg-[#1A1A1A] text-white"
        >
            {saving ? "Saving....." : label}
        </button>
  )
}

export default ArticleSentButton