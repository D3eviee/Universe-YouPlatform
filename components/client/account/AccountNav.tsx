'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

const LINKS = [
  { href: "/account", label: "Account" },
  { href: "/account/membership", label: "Membership" },
  { href: "/account/saved-content", label: "Saved content" },
];

export const AccountNav = () => {
    const pathname = usePathname();
    
    return (
        <nav className="px-1 tablet:px-0 pb-3 tablet:pb-0 text-14 flex flex-row tablet:flex-col justify-between tablet:gap-4 items-center tablet:items-start font-stretch-105% font-light tablet:font-normal overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b-[0.5px] border-b-spanish-gray tablet:border-b-0 text-dark-gray">
            {LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={`shrink-0 leading-none transition-colors hover:text-gray-500 ${isActive ? "text-dark-black font-medium" : ""}`}
                    >
                        {label}
                    </Link>
                );
            })}
            
            <form action={logoutAction} className="shrink-0 tablet:-mt-0.5">
                <button type="submit" className="hover:text-gray-500 transition-colors cursor-pointer leading-none text-14">Logout</button>
            </form>
        </nav>
    );
};