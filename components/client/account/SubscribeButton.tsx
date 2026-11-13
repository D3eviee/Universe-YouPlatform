'use client';
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { setNewsletterOptIn } from "@/app/actions/newsletter";

export const SubscribeButton = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const subscribe = () =>
    startTransition(async () => {
      setError(null);
      const result = await setNewsletterOptIn(true);
      if (!result.ok) setError(result.error);
    });

  return (
    <div className="flex flex-col gap-2 w-full tablet:w-auto">
      <button
        type="button"
        onClick={subscribe}
        disabled={isPending}
        className="w-full tablet:w-auto flex justify-center items-center bg-linear-to-bl to-dark-black from-primary text-white px-6 py-3.5 tablet:py-3 text-[15px] tablet:text-14 rounded-2xl hover:bg-dark-black/90 transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-80"
      >
        {isPending ? <Loader2Icon size={18} className="animate-spin" /> : "Get notified!"}
      </button>
      {error && <p role="alert" className="text-xs text-light-red">{error}</p>}
    </div>
  );
};