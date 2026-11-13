'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  endpoint: string;
  queryKey: string;
  noun: string; // "article" or "book"
  id: string;
  title: string;
  isDraft: boolean;
  onDeleted: () => void;
};

export const ToolbarDeleteContentButton = ({ endpoint, queryKey, noun, id, title, isDraft, onDeleted }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? `Couldn't delete the ${noun}`);
    },
    onSuccess: () => {
      onDeleted();
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleClick = () => {
    if (isDraft) {
      if (confirm(`Discard this new ${noun}?`)) onDeleted();
      return;
    }
    if (confirm(`Delete "${title || `this ${noun}`}"? This can't be undone.`)) mutate();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={isDraft ? `Discard new ${noun}` : `Delete ${noun}`}
        title={isDraft ? `Discard new ${noun}` : `Delete ${noun}`}
        className="p-1 hover:bg-hover cursor-pointer rounded-lg disabled:opacity-50"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1887FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5a2 2 0 0 1 4 0" />
          <line x1="4" y1="7" x2="20" y2="7" />
          <path d="M6 7l1.2 12.5a2 2 0 0 0 2 1.5h5.6a2 2 0 0 0 2-1.5L18 7" />
        </svg>
      </button>
      {error && <span role="alert" className="text-xs text-red-400">{error.message}</span>}
    </div>
  );
};