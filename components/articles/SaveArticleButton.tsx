'use client'
import { useOptimistic, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleSaveArticleAction } from '@/app/actions/save-article';

interface SaveButtonProps {
  articleId: string;
  initialIsSaved: boolean;
  slug: string;
  isLoggedIn: boolean;
}

export const SaveArticleButton = ({ articleId, initialIsSaved, slug, isLoggedIn }: SaveButtonProps) => {
  const router = useRouter();
  const [optimisticIsSaved, toggleOptimistic] = useOptimistic(initialIsSaved, (state) => !state);
  const [isPending, startTransition] = useTransition();
    
  const handleSave = () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=/articles/${slug}`);
      return;
    }

    startTransition(async () => {
      toggleOptimistic(undefined); 
      await toggleSaveArticleAction(articleId, `/articles/${slug}`);
    });
  };
  
  return (
    <button 
      onClick={handleSave}
      disabled={isPending}
      className="flex items-center justify-center p-0.5 transition-all hover:scale-105 disabled:opacity-90 cursor-pointer"
      aria-label={optimisticIsSaved ? "Unsave article" : "Save article"}
    >
      {optimisticIsSaved ? (
        <svg className="w-5.5 h-5.5" strokeWidth={1.5} fill="#151512" stroke='#151512' viewBox="0 0 24 24">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      ) : (
        <svg className="w-5.5 h-5.5" fill="none" stroke="#6E6E73" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
    </button>
  );
}