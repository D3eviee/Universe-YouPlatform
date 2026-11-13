import Link from "next/link";

export const GoToButton = ({ label, href, className = "" }: { label: string; href: string; className?: string }) => (
  <div className="flex justify-center mt-6 laptop:mt-12">
    <Link
      href={href}
      className={`font-semibold px-6 py-3 rounded-2xl text-[#161618] laptop:text-lg transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-black ${className}`}
    >
      {label}
    </Link>
  </div>
);