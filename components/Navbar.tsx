'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Books", href: "/books" },
    { label: "Contact", href: "/contact" }
];

const Navbar = () => { 
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => { setIsOpen(false) }, [pathname])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    const toggleMenu = () => setIsOpen(prev => !prev)

    const checkIsActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };
    
    return (
        <header 
            className={`w-full sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white/70 backdrop-blur-[20px] backdrop-saturate-180 border-b border-gray-200/50" : "bg-transparent"
            }`}
        >
            <nav className="w-full mx-auto px-4 py-3 flex flex-row justify-between items-center tablet:px-0 tablet:w-173 laptop:w-245">
                {/* <Link href="/">
                    <img 
                        src="/icon.png" 
                        alt="logo" 
                        className={`w-8 h-8 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
                    />
                </Link> */}

                <p className="text-md font-semibold">Universe&You</p>

                {/* MOBILE MENU TOGGLE */}
                <button 
                    className="tablet:hidden z-50 w-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer border-none bg-transparent p-0" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    <span className={`h-0.5 w-4 bg-[#1d1d1f] transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
                    <span className={`h-0.5 w-4 bg-[#1d1d1f] transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`} />
                </button>

                {/* MOBILE */}
                <div 
                    className={`fixed inset-0 bg-[#fbfbfd] z-40 transition-all duration-700 ease-in-out overflow-hidden ${
                        isOpen ? "h-screen opacity-100" : "h-0 opacity-0"
                    }`}
                >
                    <div className="h-full w-full px-12 py-16 flex flex-col gap-4 mt-8">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link 
                                key={href} 
                                href={href} 
                                className={`text-3xl transition-colors duration-300 tracking-tight ${
                                    checkIsActive(href) ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden tablet:flex flex-row gap-8 text-[15px] tracking-tight">
                    {NAV_LINKS.map(({ label, href }) => (
                        <Link 
                            key={href} 
                            href={href} 
                            className={`transition-colors duration-300 hover:text-[#1d1d1f] text-sm ${
                                checkIsActive(href) ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar