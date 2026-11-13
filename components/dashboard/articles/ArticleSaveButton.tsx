'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import type { Article } from "@/server/schema";
import { useIsArticleSaved } from "@/hooks/useIsSavedArticle";
import useArticleEditorStore, { type EditorArticle } from "@/store/ArticleEditorStore";
import { SaveError } from "@/lib/api-errors";
import { uploadEditorImages } from "@/lib/upload-editor-images";
import { SaveErrors } from "../shared/SaveErrors";

/** Uploads new images straight to S3, then saves the article as JSON. */
async function saveArticle(article: EditorArticle): Promise<Article> {
  const { cover, blocks } = await uploadEditorImages("articles", article.id, {
    cover: article.thumbnailImage,
    blocks: article.blocks,
  });

  const res = await fetch("/api/dashboard/articles", {
    method: article.isLocalDraft ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      category: article.category,
      status: article.status,
      priority: article.priority,
      thumbnailImage: cover,
      thumbnailAlt: article.thumbnailAlt,
      thumbnailAnnotaion: article.thumbnailAnnotaion,
      thumbnailDescription: article.thumbnailDescription,
      publishedAt: article.publishedAt.toISOString(),
      blocks,
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new SaveError(json.error ?? "Couldn't save the article", json.issues);
  return { ...json, publishedAt: new Date(json.publishedAt), createdAt: new Date(json.createdAt) };
}

export const ArticleSaveButton = () => {
  const activeArticle = useArticleEditorStore((s) => s.activeArticle);
  const setActiveArticle = useArticleEditorStore((s) => s.setActiveArticle);
  const queryClient = useQueryClient();
  const isSaved = useIsArticleSaved();

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: saveArticle,
    onSuccess: (saved) => {
      setActiveArticle(saved); // S3 keys instead of Files, so the next save won't upload again
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <SaveErrors error={error} />
      <button
        type="button"
        onClick={() => { reset(); mutate(activeArticle); }}
        disabled={isSaved || isPending}
        className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5} /> : "Save"}
      </button>
    </div>
  );
};