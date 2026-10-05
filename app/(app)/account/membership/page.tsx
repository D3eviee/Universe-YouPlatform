import { subscribeToNewsletterAction } from '@/app/actions/newsletter';
import { verifySession } from '@/lib/session';
import { db } from '@/server/db';
import { users } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MembershipPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) redirect('/login');

  const session = await verifySession(sessionCookie.value);
  if (!session?.id) redirect('/login');

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id as string),
    columns: { newsletterOptIn: true }
  });

  if (!user) redirect('/login');

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
        {user.newsletterOptIn ? (
          <div className="flex items-center gap-3 px-5 py-3.5 tablet:px-6 tablet:py-3 bg-linear-to-bl to-dark-black from-primary border-[0.5px] border-dark-black rounded-2xl w-full tablet:w-auto">
            <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" strokeWidth={1.5} stroke='#FFF'>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-light text-white leading-5 text-pretty">You're on the waitlist. We'll keep you posted!</span>
          </div>
        ) : (
          
          <form action={async () => { "use server"; await subscribeToNewsletterAction() }} className="w-full tablet:w-auto">
            <button
              type="submit" 
              className="w-full tablet:w-auto bg-linear-to-bl to-dark-black from-primary text-white px-6 py-3.5 tablet:py-3 text-[15px] tablet:text-14 rounded-2xl hover:bg-dark-black/90 transition-colors cursor-pointer"
            >
              Get notified!
            </button>
          </form>
        )}
      </div>
    </section>
  );
}