import type { ReactNode } from "react";

type ToolbarButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

export const ToolbarButton = ({ label, onClick, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={`Add ${label.toLowerCase()}`}
    className="p-1 hover:bg-hover cursor-pointer rounded-lg"
  >
    {children}
  </button>
);