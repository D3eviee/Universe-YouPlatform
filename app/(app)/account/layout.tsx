import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-5xl py-16 mx-auto flex flex-1 h-full">
            <div className="flex flex-row w-full">
                {/* ASIDE NAV */}
                <aside className="min-w-75 max-w-75 flex flex-col pr-8 border-r-[0.5px] border-spanish-gray h-full">
                    <h1 className="text-3xl font-mono mb-1">Hello</h1>
                    <h2 className="text-15 font-mono font-light leading-tight">Welcome to your account</h2>

                    <div className='h-[0.5px] w-full my-8 bg-dark-gray'/>
                    
                    <nav className="text-14 flex flex-col gap-3 items-start tracking-wider font-light">
                        <Link href="/account" className="hover:text-gray-500 transition-all cursor-pointer">Account</Link>
                        <Link href="/account/membership" className="hover:text-gray-500 transition-all cursor-pointer">Membership</Link>
                        <Link href="/account/saved-content" className="hover:text-gray-500 transition-all cursor-pointer">Saved content</Link>
                    
                        <form action={logoutAction} className="mt-1 cursor-pointer">
                            <button 
                                type="submit" 
                                className="hover:text-gray-500 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </form>
                    </nav>
                </aside>

                {/* CHANGING TABS */}
                <div className="w-full flex flex-col pl-8 flex-1">{children}</div>
            </div>
        </main>
    );
}