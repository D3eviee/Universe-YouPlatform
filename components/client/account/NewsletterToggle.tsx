'use client';
import { useOptimistic, useState, useTransition } from "react";
import { setNewsletterOptIn } from "@/app/actions/newsletter";

export const NewsletterToggle = ({ isOptedIn }: { isOptedIn: boolean }) => {
  const [optimisticValue, setOptimisticValue] = useOptimistic(isOptedIn);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (next: boolean) => {
    setError(null);
    startTransition(async () => {
      setOptimisticValue(next); // the switch moves immediately
      const result = await setNewsletterOptIn(next);
      if (!result.ok) setError(result.error); // on failure it snaps back on its own
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <label className={`relative inline-flex items-center ${isPending ? "cursor-wait" : "cursor-pointer"}`}>
        <input
          type="checkbox"
          role="switch"
          aria-label="Waitlist and newsletter emails"
          className="sr-only peer"
          checked={optimisticValue}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={isPending}
        />
        <span
          aria-hidden="true"
          className="w-11 h-6 bg-gray-300 rounded-full transition-colors peer-checked:bg-aqua-dark peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-aqua-dark after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:border after:border-gray-300 after:transition-transform peer-checked:after:translate-x-full peer-checked:after:border-white"
        />
        </label>
        {error && <p role="alert" className="text-xs text-light-red">{error}</p>}
    </div>
  );
}