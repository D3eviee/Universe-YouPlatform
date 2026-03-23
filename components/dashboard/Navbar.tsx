'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Articles", href: "/dashboard" },
  { name: "Quotes", href: "/dashboard/quotes" },
  { name: "Books", href: "/dashboard/books" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav">
      <h1 className="text-sm font-semibold text-white">Universe&You</h1>
      
      <ul>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.name}>
              <Link 
                href={link.href}
                className={isActive ? "text-white font-bold" : "text-gray-400"}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="profile">HR</div>
    </nav>
  )
}

export default Navbar;