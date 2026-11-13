import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getAccountInfo } from "@/server/queries/users";
import { NewsletterToggle } from "@/components/client/account/NewsletterToggle";

export default async function AccountPage() {
  const { id } = await requireUser();
  const account = await getAccountInfo(id);
  if (!account) redirect("/login");

  return (
    <section className="flex flex-col h-full">
      <h1 className="text-xl font-medium leading-none mb-6 laptop:mb-8">Account</h1>
      
      {/* PERSONAL DATA */}
      <div className="bg-light-gray p-6 laptop:px-12 laptop:py-10 rounded-4xl flex flex-col">
        <div className="flex flex-col mb-8 laptop:mb-12">
          <span className="text-base font-semibold mb-2 text-dark-black">Email Address</span>
          <span className="text-dark-gray font-base text-sm leading-none tracking-wide">{account.email}</span>
        </div>
        
        {/* NEWSLETTER */}
        <div className="flex flex-col">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-dark-gray mb-4 laptop:mb-3 font-stretch-110%">Preferences</h2>
          
          <div className="flex items-center justify-between gap-6 laptop:gap-10">
            <div className='flex flex-col'>
               <p className="text-base font-semibold mb-2 text-dark-black leading-none">Waitlist &amp; Newsletter</p>
               <p className="text-dark-gray font-base text-sm leading-5 tracking-wide text-pretty"> Receive updates about new articles and early access to premium features.</p>
            </div>
            
            <div className="shrink-0">
              <NewsletterToggle isOptedIn={account.newsletterOptIn} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}