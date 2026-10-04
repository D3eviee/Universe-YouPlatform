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
      <h1 className="text-2xl font-medium leading-tight mb-8">Membership</h1>
      
      <div className="bg-light-gray px-12 py-10 rounded-4xl flex flex-col items-start">
        <p className="text-3xl font-serif font-semibold mb-2">Cool things cooming soon...</p>
      
        <p className="text-dark-gray font-base mb-6 text-sm leading-relaxed">
          We are currently in the beta phase with all articles fully unlocked. Paid premium tiers, content and exclusive educational modules will be introduced soon. Sign up to get notified and secure early-bird access.
        </p>


        {/* IF USER SUBSCRIBES TO NEWSLETTER WE DON'T DISPLAY BUTTON TO JOIN IT */}
        {/* THEN WE DISPLAY SIMPLE NOTIFICATION, USER IS UP TO DATE WITH OUR PLATFORM */}
        {user.newsletterOptIn ? (
          <div className="flex items-center gap-3 px-6 py-3 bg-linear-to-bl to-dark-black from-primary border-[0.5px] border-dark-black rounded-2xl">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" strokeWidth={1.5} stroke='#FFF'>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-light text-white">You're on the waitlist. We'll keep you posted!</span>
          </div>)
          : (
          <form action={async () => { "use server"; await subscribeToNewsletterAction() }}>
            <button
              type="submit" 
              className="bg-linear-to-bl to-dark-black from-primary text-white px-6 py-3 text-14 rounded-2xl hover:bg-dark-black/90 transition-colors cursor-pointer"
            >
              Get nottified!
            </button>
          </form>
        )}
      </div>
    </section>
  );
}