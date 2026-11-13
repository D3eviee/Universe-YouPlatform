import type { ReactNode } from "react";

export const AsideMenuContainer = ({ children }: { children: ReactNode }) => (
  <aside className="h-full min-w-80 shrink-0 flex flex-col gap-[0.5px] bg-secondary-dark p-3 overflow-y-auto">
    {children}
  </aside>
);