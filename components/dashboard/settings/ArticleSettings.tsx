'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore"
import CategorySelect from "./CategorySelect"
import PrioritySelect from "./PrioritySelect"
import StatusSelect from "./StatusSelect"
import ArticleMainImageUpload from "./ArticleMainImageUpload"
import TimeSelect from "./TimeSelect"
import ArticleSentButton from "./ArticleSentButton"

const ArticleSettings = () => {
    const updateArticleField = useArticleEditorStore(store => store.updateArticleField)
    const selectedCategory = useArticleEditorStore(store => store.activeArticle?.category)
    const selectedStatus = useArticleEditorStore(store => store.activeArticle?.status)
    const selectedPriority = useArticleEditorStore(store => store.activeArticle?.priority)
    const publishedAt = useArticleEditorStore(store => store.activeArticle?.publishedAt)
    selectedStatus == "archived" ? "Archive article" : "Publish article"

    return (
        <section className="w-1/3 flex flex-col gap-10 bg-secondary-dark p-5 rounded-3xl">
            <div className="flex flex-col gap-10 overflow-scroll scrollbar__none">
                <ArticleMainImageUpload/>

                <CategorySelect 
                    selectedCategory={selectedCategory} 
                    onChange={(newCategory) => updateArticleField("category", newCategory)} 
                />
                <PrioritySelect
                    selectedPriority={selectedPriority}
                    onChange={(newPriority) => updateArticleField("priority", newPriority)}
                />
                <StatusSelect
                    selectedStatus={selectedStatus}
                    onChange={(newStatus) => updateArticleField("status", newStatus)}
                />
                <TimeSelect
                    onChange={(newDate) => updateArticleField("publishedAt", newDate)}
                    selectedDate={publishedAt}
                />
            </div>

            <ArticleSentButton/>
        </section>
  )
}

export default ArticleSettings