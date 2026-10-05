'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isLoggedIn: boolean;
  navLinks: { label: string; href: string }[];
}

export const ClientNavbarMobile = ({ isLoggedIn, navLinks }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#19191C';
      
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color'); 
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', '#19191C');
      
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.backgroundColor = '';
      
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
    }

    return () => { 
      document.body.style.overflow = 'unset'; 
      document.body.style.backgroundColor = '';
    };
  }, [isOpen]);

  return (
    <div className="tablet:hidden h-full ">
      {/* --- HAMBURGER BUTTON --- */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-dark-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        aria-label="Open navigation"
      >
        <Menu size={24} strokeWidth={2} className='text-dark-black'/>
      </button>

      {/* --- OVERLAY MENU --- */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-dvh bg-secondary-dark/80 backdrop-blur-2xl z-200 flex flex-col overflow-y-auto animate-in fade-in duration-300">
          <div className="flex flex-col gap-4 px-6 pt-20 pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {navLinks.map(({ label, href }) => (
              <Link 
                key={href} 
                href={href} 
                onClick={closeMenu}
                className="flex justify-between items-center py-3.5 group"
              >
                <span className="text-white text-md tracking-wide group-hover:text-spanish-gray transition-colors">{label}</span>
                <ChevronRight size={20} className="text-white/80" strokeWidth={2} />
              </Link>
            ))}
            
            {/* JOIN OR GO TO ACCOUNT */}
            <Link 
              href={isLoggedIn ? "/account" : "/login"} 
              onClick={closeMenu}
              className="flex justify-between items-center py-3.5 group"
            >
              <span className="text-white text-md tracking-wide group-hover:text-gray-300 transition-colors">
                {isLoggedIn ? "Account panel" : "Join Now"}
              </span>
              <ChevronRight size={20} className="text-white/80" />
            </Link>
          </div>

          {/* Sekcja wyróżniona (np. OTW / Novus) */}
          <div className="bottom-12 fixed flex flex-row justify-between items-end w-full px-6">
            <h3 className="text-white font-bold text-2xl tracking-widest uppercase border-t-[0.5px] border-b-[0.5px] py-0.5">Novus</h3>

            {/* CLOSE BUTTON */}
            <button 
              onClick={closeMenu}
              className="bg-light-gray w-13 rounded-2xl h-13 flex items-center justify-center cursor-pointer hover:bg-light-gray/80 transition-colors shadow-xl z-60"
              aria-label="Zamknij menu"
            >
              <X size={26} className="text-black" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}