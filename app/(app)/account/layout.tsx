import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-1 w-full tablet:w-5xl mx-auto px-4 py-6 tablet:px-0 tablet:py-16 h-full">
            <div className="w-full flex flex-col tablet:flex-row ">
                {/* ASIDE NAV */}
                <aside className="flex flex-col w-full tablet:min-w-75 tablet:max-w-75 pr-0 tablet:pr-8 tablet:border-r-[0.5px] border-spanish-gray h-auto tablet:h-full">
                    <h1 className="text-3xl tablet:text-4xl font-mono mb-1 leading-none text-dark-black">Hello</h1>
                    <h2 className="text-15 font-mono font-light leading-none text-light-black mb-6 tablet:mb-0">Welcome to your account</h2>

                    <div className='h-[0.5px] w-full my-3 tablet:my-6 bg-spanish-gray'/>
                    
                    <nav className="px-1 tablet:px-0 pb-3 tablet:pb-0 text-14 flex flex-row tablet:flex-col justify-between tablet:gap-4 items-center tablet:items-start font-stretch-105% font-light tablet:font-normal overflow-x-auto whitespace-nowrap[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b-[0.5px] border-b-spanish-gray tablet:border-b-0 text-dark-gray">
                    
                        <Link href="/account" className="shrink-0 hover:text-gray-500 transition-all cursor-pointer leading-none">Account</Link>
                        <Link href="/account/membership" className="shrink-0 hover:text-gray-500 transition-all cursor-pointer leading-none">Membership</Link>
                        <Link href="/account/saved-content" className="shrink-0 hover:text-gray-500 transition-all cursor-pointer leading-none">Saved content</Link>
                    
                        <form action={logoutAction} className="shrink-0 cursor-pointer tablet:-mt-0.5">
                            <button 
                                type="submit" 
                                className="hover:text-gray-500 transition-colors cursor-pointer leading-none text-14"
                            >
                                Logout
                            </button>
                        </form>
                    </nav>
                </aside>

                {/* CHANGING TABS */}
                <div className="w-full flex flex-col pl-0 tablet:pl-8 flex-1 mt-8 tablet:mt-0">{children}</div>
            </div>
        </main>
    );
}