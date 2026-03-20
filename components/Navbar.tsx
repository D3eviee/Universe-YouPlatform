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
    
    return (
        <nav className="bg-white px-4 py-2 flex flex-row justify-between items-center relative z-50 tablet:px-6 laptop:px-20">
            <img 
                src="/icon.png" 
                alt="logo" 
                className={`w-8 h-8 transition-all duration-300 ${open ? "opacity-0 shadow-2xs" : "opacity-100"}`}
            />

            <div 
                className="tablet:hidden z-50 w-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer" 
                onClick={handleNavbar}
            >
                <span className={`h-0.5 w-4 bg-gray-500 transition-all duration-300 ${open ? "rotate-45 translate-y-1" : ""}`}></span>
                <span className={`h-0.5 w-4 bg-gray-500 transition-all duration-300 ${open ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </div>

            <div 
                className={`fixed top-0 left-0 w-full bg-[#F9F9FB] z-40 transition-all duration-700 ease-in-out overflow-hidden ${open ? "h-screen opacity-100 " : "h-0 opacity-20"}`}
            >
                <div className="h-full w-full px-12 py-16 flex flex-col gap-3 text-gray-700">
                    <Link href="/" className="text-2xl font-semibold hover:cursor-pointer">Home</Link>
                    <Link href="/articles" className="text-2xl font-semibold hover:cursor-pointer">Articles</Link>
                    <Link href="/books" className="text-2xl font-semibold hover:cursor-pointer">Books</Link>
                    <Link href="/contact" className="text-2xl font-semibold">Contact</Link>
                </div>
            </div>

            <div className="hidden tablet:flex flex-row gap-8 text-basic">
                <Link href="/" className="hover:cursor-pointer">Home</Link>
                <Link href="/articles" className="hover:cursor-pointer">Articles</Link>
                <Link href="/books" className="hover:cursor-pointer">Books</Link>
                <Link href="/support" className="hover:cursor-pointer">Support</Link>
            </div>
        </nav>
    )
}

export default Navbar