import type { ReactNode } from "react";
import { DeleteInputButton } from "./DeleteInputButton";

type BlockShellProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  actions?: ReactNode; 
  onDelete: (id: string) => void;
  children: ReactNode;
};

export const BlockShell = ({ id, title, icon, actions, onDelete, children }: BlockShellProps) => (
    <section data-block-id={id} aria-label={`${title} block`} className="w-full flex flex-col bg-primary px-2 py-6 rounded-2xl relative">
        <div className="px-2 flex flex-row justify-between items-center mb-2">
            <span className="text-gray-400 font-light tracking-wider text-xs leading-none uppercase flex items-center gap-2">{icon}{title}</span>
            
            <div className="flex flex-row items-center gap-3">
                {actions}
                <DeleteInputButton label={`Delete ${title.toLowerCase()} block`} onClick={() => onDelete(id)} />
            </div>
        </div>
        {children}
    </section>
);