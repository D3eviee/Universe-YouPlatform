import Link from "next/link"
import { cookies } from 'next/headers';
import { ClientNavbarMobile } from "./ClientNavbarMobile";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Books", href: "/books" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
];

export const ClientNavbar = async () =>  {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const isLoggedIn = !!session?.value;

  return ( 
    <header className="flex items-center justify-between py-2.5 bg-white relative z-50">
      <nav className="w-full mx-auto px-4 py-3 flex flex-row justify-between items-center tablet:px-0 tablet:w-173 laptop:w-5xl">
        <Link href="/" className="text-2xl font-semibold">Novus</Link>
          
        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden tablet:flex flex-row items-center gap-6 tracking-tight">
          <div className="flex flex-row gap-6 justify-center items-center">                    
            {NAV_LINKS.map(({ label, href }) => (
              <Link 
                key={href} 
                href={href} 
                className="transition-colors duration-300 text-sm border-b border-b-transparent hover:border-b-[#86868b]"
              >
                {label}
              </Link>
            ))}
          </div>
          
          <div className="w-px h-5 bg-[#86868B]"/>
            
          {!isLoggedIn ? (
            <Link 
              href="/login"
              className="bg-theme-dark text-white px-4 py-1.5 rounded-xl text-sm"
            >
              Join Now
            </Link>
          ) : (
            <Link 
              href={"/account"} 
              className=" text-sm border-b border-b-transparent hover:border-b-[#86868b] transition-colors duration-300"
            >
              Acount panel
            </Link>
          )}
        </div>

        {/* --- MOBILE NAVIGATION --- */}
        <ClientNavbarMobile isLoggedIn={isLoggedIn} navLinks={NAV_LINKS} />
      </nav>
    </header>
  )
}