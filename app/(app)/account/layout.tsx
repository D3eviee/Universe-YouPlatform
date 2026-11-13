import { AccountNav } from "@/components/client/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-1 w-full tablet:w-5xl mx-auto px-4 py-6 tablet:px-0 tablet:py-16 h-full">
            <div className="w-full flex flex-col tablet:flex-row ">
                {/* ASIDE NAV */}
                <aside className="flex flex-col w-full tablet:min-w-75 tablet:max-w-75 pr-0 tablet:pr-8 tablet:border-r-[0.5px] border-spanish-gray h-auto tablet:h-full">
                    <p className="text-3xl tablet:text-4xl font-mono mb-1 leading-none text-dark-black">Hello</p>
                    <p className="text-15 font-mono font-light leading-none text-light-black mb-6 tablet:mb-0">Welcome to your account</p>

                    <div className='h-[0.5px] w-full my-3 tablet:my-6 bg-spanish-gray'/>
                    
                    <AccountNav/>
                </aside>

                {/* CHANGING TABS */}
                <div className="w-full flex flex-col pl-0 tablet:pl-8 flex-1 mt-8 tablet:mt-0">{children}</div>
            </div>
        </main>
    );
}