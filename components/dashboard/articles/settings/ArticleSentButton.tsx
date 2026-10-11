'use client'
import { useIsArticleSaved } from "@/hooks/useIsSavedArticle"
import useArticleEditorStore from "@/store/ArticleEditorStore"
import { EditorBlock } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Oval } from "react-loader-spinner"

export const ArticleSentButton = () => {
    const activeArticle = useArticleEditorStore(store => store.activeArticle);
    const queryClient = useQueryClient()
    const isSaved = useIsArticleSaved()

    const saveMutation = useMutation({
        mutationFn: async ({ method, formData }: { method: string, formData: FormData }) => {
            const response = await fetch("/api/dashboard/articles", {            
                method: method, 
                body: formData
            });
            if (!response.ok) throw new Error("Error while saving article");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
        onError: (error) => {
            console.error("Błąd zapisu:", error);
        }
    });

    const handleSave = async () => {
        if (!activeArticle) return;
        const { title, subtitle, status, category, thumbnailAlt, thumbnailImage, thumbnailDescription, id, thumbnailAnnotaion, authorId, priority, blocks, publishedAt } = activeArticle;

        if(!title || !subtitle || !category || !status || !authorId || !publishedAt || !blocks) {
            console.warn("Missing fields!");
            return; 
        }
        const formData = new FormData();
        formData.append("id", id);
        formData.append("authorId", authorId.toString());
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("status", status);
        formData.append("category", category);
        formData.append("thumbnailFile", thumbnailImage);
        formData.append("thumbnailDescription",  thumbnailDescription);
        formData.append("thumbnailAlt",  thumbnailAlt);
        formData.append("thumbnailAnnotaion",  thumbnailAnnotaion);
        formData.append("priority",  priority);
        formData.append("publishedAt",  publishedAt.toISOString());
        formData.append("blocks", JSON.stringify(blocks));

        blocks.forEach((block: EditorBlock) => {
            if (block.type === "image" && block.data.imageFile) {
                formData.append(`image-${block.id}`, block.data.imageFile);
            } 
            else if (block.type === "gallery") {
                block.data.images.forEach((img, index) => {
                    if (img.imageFile) formData.append(`gallery-${block.id}-${index}`, img.imageFile);
                });
            }
        });

        const isNewDraft = (activeArticle as any).isLocalDraft === true;
        const httpMethod = isNewDraft ? "POST" : "PUT";
        saveMutation.mutate({ method: httpMethod, formData });
    }

    return (
        <button 
            onClick={handleSave}
            type="button"
            disabled={isSaved || saveMutation.isPending} 
            className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
            { saveMutation.isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5}/> : "Save" }
        </button>
  )
}
