'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const Navbar = () => { 
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        
        return () => {document.body.style.overflow = ""}
    }, [open])

    const handleNavbar = () => setOpen(prev => !prev)

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };
    
    return (
        <nav className="bg-white px-4 py-2 flex flex-row justify-between items-center relative z-50 tablet:px-6 laptop:px-20">
            <Link href="/">
                <img 
                    src="/icon.png" 
                    alt="logo" 
                    className={`w-8 h-8 transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
                />
            </Link>

            <div 
                className="tablet:hidden z-50 w-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer" 
                onClick={handleNavbar}
            >
                <span className={`h-0.5 w-4 bg-[#1d1d1f] transition-all duration-300 ${open ? "rotate-45 translate-y-1" : ""}`}></span>
                <span className={`h-0.5 w-4 bg-[#1d1d1f] transition-all duration-300 ${open ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </div>

            {/* MENU MOBILNE */}
            <div 
                className={`fixed top-0 left-0 w-full bg-[#fbfbfd] z-40 transition-all duration-700 ease-in-out overflow-hidden ${open ? "h-screen opacity-100 " : "h-0 opacity-0"}`}
            >
                <div className="h-full w-full px-12 py-16 flex flex-col gap-4 mt-8">
                    <Link href="/" className={`text-3xl transition-colors duration-300 tracking-tight ${isActive("/") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"}`}>Home</Link>
                    <Link href="/articles" className={`text-3xl transition-colors duration-300 tracking-tight ${isActive("/articles") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"}`}>Articles</Link>
                    <Link href="/books" className={`text-3xl transition-colors duration-300 tracking-tight ${isActive("/books") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"}`}>Books</Link>
                    <Link href="/contact" className={`text-3xl transition-colors duration-300 tracking-tight ${isActive("/contact") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b]"}`}>Contact</Link>
                </div>
            </div>

            {/* MENU DESKTOPOWE */}
            <div className="hidden tablet:flex flex-row gap-8 text-[15px] tracking-tight">
                <Link href="/" className={`transition-colors duration-300 ${isActive("/") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b] hover:text-[#1d1d1f]"}`}>Home</Link>
                <Link href="/articles" className={`transition-colors duration-300 ${isActive("/articles") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b] hover:text-[#1d1d1f]"}`}>Articles</Link>
                <Link href="/books" className={`transition-colors duration-300 ${isActive("/books") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b] hover:text-[#1d1d1f]"}`}>Books</Link>
                <Link href="/contact" className={`transition-colors duration-300 ${isActive("/contact") ? "text-[#1d1d1f] font-semibold" : "text-[#86868b] hover:text-[#1d1d1f]"}`}>Support</Link>
            </div>
        </nav>
    )
}

export default Navbar