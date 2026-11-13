'use client';
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { ArticlesMenu } from "@/components/dashboard/articles/ArticlesMenu";
import { ArticleToolbar } from "@/components/dashboard/articles/ArticleToolbar";
import { ArticleTextField } from "@/components/dashboard/articles/ArticleTextField";
import { ArticleSettings } from "@/components/dashboard/articles/ArticleSettings";
import { BlockListEditor } from "@/components/dashboard/editor/BlockListEditor";

export default function ArticlesDashboard() {
  const blocks = useArticleEditorStore((s) => s.activeArticle.blocks);
  const updateBlockData = useArticleEditorStore((s) => s.updateBlockData);
  const deleteBlock = useArticleEditorStore((s) => s.deleteArticleContentBlock);

  return (
    <div className="w-full h-[calc(100dvh-55px)] flex flex-row">
      <ArticlesMenu />
      <main className="flex-1 min-w-0 flex flex-row gap-3 border-l-[0.5px] border-l-black bg-primary-dark p-5">
        <section className="w-full h-full flex flex-col mx-2 overflow-hidden">
          <ArticleToolbar />
          <div className="w-full flex flex-col gap-5 overflow-y-auto pr-4">
            <ArticleTextField field="title" label="Title" placeholder="Type title here..." maxLength={200} />
            <ArticleTextField field="subtitle" label="Subtitle" placeholder="Subtitle for your article" maxLength={500} multiline />
            <BlockListEditor blocks={blocks} onUpdate={updateBlockData} onDelete={deleteBlock} />
          </div>
        </section>
        <ArticleSettings />
      </main>
    </div>
  );
}