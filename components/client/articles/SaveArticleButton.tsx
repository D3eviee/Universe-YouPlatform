'use client';
import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setArticleSavedAction } from "@/app/actions/save-article";

type SaveButtonProps = {
  articleId: string;
  initialIsSaved: boolean;
  slug: string;
  isLoggedIn: boolean;
};

export const SaveArticleButton = ({ articleId, initialIsSaved, slug, isLoggedIn }: SaveButtonProps) => {
  const router = useRouter();
  const [isSaved, setOptimisticSaved] = useOptimistic(initialIsSaved);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/articles/${slug}`)}`);
      return;
    }

    const next = !isSaved;
    setError(null);
    startTransition(async () => {
      setOptimisticSaved(next); // the icon changes immediately
      const result = await setArticleSavedAction(articleId, next);
      if (!result.ok) setError(result.error); // on failure the icon reverts on its own
    });
  };

  return (
    <div className="relative flex flex-col items-end">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isSaved}
        aria-label="Save article"
        title={isSaved ? "Remove from saved" : "Save article"}
        className="flex items-center justify-center p-0.5 transition-transform hover:scale-105 disabled:opacity-90 cursor-pointer"
      >
        {isSaved ? (
          <svg aria-hidden="true" className="w-5.5 h-5.5" fill="#151512" stroke="#151512" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="w-5.5 h-5.5" fill="none" stroke="#6E6E73" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
      </button>
      {error && (
        <p role="alert" className="absolute top-full right-0 mt-1 w-48 text-right text-xs text-light-red">
          {error}
        </p>
      )}
    </div>
  );
};