import { redirect } from 'next/navigation';
import { requireUser } from "@/lib/auth";
import { getAccountInfo } from "@/server/queries/users";
import { SubscribeButton } from '@/components/client/account/SubscribeButton';

export default async function MembershipPage() {
  const { id } = await requireUser();
  const account = await getAccountInfo(id);
  if (!account) redirect("/login");

  return (
    <section className="flex flex-col h-full">
      <h1 className="text-xl font-medium leading-none mb-6 laptop:mb-8">Membership</h1>

      <div className="bg-light-gray p-6 laptop:px-12 laptop:py-10 rounded-4xl flex flex-col">
        <p className="text-2xl tablet:text-3xl font-medium mb-2">Coming soon...</p>
    
        <p className="text-dark-gray font-base text-sm leading-6 tracking-wide text-pretty mb-8">
          We are currently in the beta phase with all articles fully unlocked. Paid premium tiers, content and exclusive educational modules will be introduced soon. Sign up to get notified and secure early-bird access.
        </p>

        {/* IF USER SUBSCRIBES TO NEWSLETTER WE DON'T DISPLAY BUTTON TO JOIN IT */}
        {/* THEN WE DISPLAY SIMPLE NOTIFICATION, USER IS UP TO DATE WITH OUR PLATFORM */}
        {account.newsletterOptIn ? (
          <div className="flex items-center gap-3 px-5 py-3.5 tablet:px-6 tablet:py-3 bg-linear-to-bl to-dark-black from-primary border-[0.5px] border-dark-black rounded-2xl w-full tablet:w-auto">
            <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-light text-white leading-5 text-pretty">You&apos;re on the waitlist. We&apos;ll keep you posted!</span>
          </div>
        ) : ( 
          <SubscribeButton /> 
        )}
      </div>
    </section>
  );
}