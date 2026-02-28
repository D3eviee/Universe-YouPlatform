
'use client'
import Link from "next/link"
import { useState } from "react"

const Navbar = () => { 
    const [open, setOpen ] = useState(false)

    const handleNavbar = () => {
        setOpen(prev => prev = !prev)

        if(open === false){
            document.body.style.overflow = "hidden" 
        }else{
            document.body.style.overflow = "scroll"
        }
    }
    
    return (
        <nav className="bg-white px-4 py-2 flex flex-row justify-between items-center relative z-50 md:px-6 lg:px-20">
            <img src="icon.png" alt="logo" className={`w-8 h-8 transition-all duration-300 ${open ? "opacity-0 shadow-2xs" : "opacity-100"}`}/>

            <div className="md:hidden z-50 w-8 flex flex-col justify-center items-center gap-1.5" onClick={handleNavbar}>
                <span className={`h-0.5 w-4 bg-gray-500 transition-all duration-300 ${open && "rotate-45 translate-y-1"}`}></span>
                <span className={`h-0.5 w-4 bg-gray-500 transition-all duration-300 ${open && "-rotate-45 -translate-y-1"}`}></span>
            </div>

            <div className={`fixed top-0 left-0 w-full bg-[#F9F9FB] text-gray-700 py-16 px-12 z-40 flex flex-col gap-3 transition-all duration-700 ease-in-out overflow-hidden ${open ? "h-screen opacity-100" : "h-0 opacity-0"}`}>
                <a href="#" className="text-2xl font-semibold">Home</a>
                <Link href="/articles" className="text-2xl font-semibold">Articles</Link>
                <a href="#" className="text-2xl font-semibold">Books</a>
                <a href="#" className="text-2xl font-semibold">Contact</a>
        </div>

        <div className="hidden md:flex flex-row gap-8 text-basic">
                <Link href="/">Home</Link>
                <Link href="/articles">Articles</Link>
                <Link href="/support">Support</Link>
            </div>
        </nav>
    )
}

export default Navbar