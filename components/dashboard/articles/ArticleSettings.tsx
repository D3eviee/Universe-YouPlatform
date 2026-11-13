'use client';
import useArticleEditorStore from "@/store/ArticleEditorStore";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/lib/constants/constants";
import { CATEGORY_OPTIONS } from "@/lib/constants/categories";
import { ChipSelect } from "../shared/ChipSelect";
import { TimeSelect } from "../shared/TimeSelect";
import { SettingsContainer } from "../shared/SettingsContainer";
import { ArticleHeaderImageUpload } from "./ArticleHeaderImageUpload";
import { ArticleSaveButton } from "./ArticleSaveButton";

export const ArticleSettings = () => {
  const category = useArticleEditorStore((s) => s.activeArticle.category);
  const priority = useArticleEditorStore((s) => s.activeArticle.priority);
  const status = useArticleEditorStore((s) => s.activeArticle.status);
  const publishedAt = useArticleEditorStore((s) => s.activeArticle.publishedAt);
  const update = useArticleEditorStore((s) => s.updateArticleField);

  return (
    <SettingsContainer>
      <div className="flex flex-col gap-10 overflow-y-auto scrollbar__none">
        <ArticleHeaderImageUpload />
        <ChipSelect label="Category" options={CATEGORY_OPTIONS} selected={category} onChange={(v) => update("category", v)} />
        <ChipSelect label="Priority" options={PRIORITY_OPTIONS} selected={priority} onChange={(v) => update("priority", v)} />
        <ChipSelect label="Status" options={STATUS_OPTIONS} selected={status} onChange={(v) => update("status", v)} />
        <TimeSelect selectedDate={publishedAt} onChange={(d) => update("publishedAt", d)} />
      </div>
      <ArticleSaveButton />
    </SettingsContainer>
  );
};