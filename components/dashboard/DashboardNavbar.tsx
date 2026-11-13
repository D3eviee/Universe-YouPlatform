'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { BookOpen, ExternalLink, FileText, Loader2, LogOut, Quote } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

const NAV_LINKS = [
  { name: "Articles", href: "/dashboard", icon: FileText },
  { name: "Books", href: "/dashboard/books", icon: BookOpen },
  { name: "Quotes", href: "/dashboard/quotes", icon: Quote },
];

const isActivePath = (pathname: string, href: string) =>
  href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

export const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="h-14 w-full shrink-0 grid grid-cols-[1fr_auto_1fr] items-center px-4 bg-secondary-dark border-b border-white/5">
      {/* BRAND */}
      <span className="text-sm font-semibold text-white tracking-tight">Universe&amp;You</span>

      {/* SECTIONS */}
      <nav aria-label="Dashboard sections">
        <ul className="flex items-center gap-1 rounded-xl bg-black/30 p-1 ring-1 ring-white/5">
          {NAV_LINKS.map(({ name, href, icon: Icon }) => {
            const isActive = isActivePath(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    isActive
                      ? "bg-white/10 text-white font-medium shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon aria-hidden="true" size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2">
        <Link
          href="/"
          target="_blank"
          className="hidden tablet:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          View site
          <ExternalLink aria-hidden="true" size={13} />
          <span className="sr-only">(opens in a new tab)</span>
        </Link>

        <form action={logoutAction}>
          <LogoutButton />
        </form>
      </div>
    </header>
  );
};

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors cursor-pointer hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
    >
      {pending ? <Loader2 aria-hidden="true" size={14} className="animate-spin" /> : <LogOut aria-hidden="true" size={14} />}
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
};