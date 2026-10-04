'use client'
import { toggleNewsletterAction } from "@/app/actions/newsletter";
import { useTransition } from "react";

export const NewsletterToggle = ({ isOptedIn }: { isOptedIn: boolean }) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleNewsletterAction(isOptedIn);
    });
  };

  return (
    <label className={`relative inline-flex items-center ${isPending ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={isOptedIn} 
        onChange={handleToggle}
        disabled={isPending}
      />
      
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aqua-dark">
      </div>
    </label>
  );
}