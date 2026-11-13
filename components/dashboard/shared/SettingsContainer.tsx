import type { ReactNode } from "react";

export const SettingsContainer = ({ children }: { children: ReactNode }) => (
  <aside aria-label="Settings" className="w-83 shrink-0 flex flex-col gap-10 bg-secondary-dark p-5 rounded-3xl">
    {children}
  </aside>
);