import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/server/db';
import { users } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { verifySession } from '@/lib/session';
import { NewsletterToggle } from '@/components/NewsletterToggle';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) redirect('/login');

  const session = await verifySession(sessionCookie.value);
  if (!session?.id) redirect('/login');

  // --- GET USER DATA FROM DB ---
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id as string),
  });

  if (!user) redirect('/login');

  return (
    <section className="flex flex-col h-full">
      <h1 className="text-xl font-medium leading-none mb-6 laptop:mb-8">Account</h1>
      
      {/* PERSONAL DATA */}
        <div className="bg-light-gray p-6 laptop:px-12 laptop:py-10 rounded-4xl flex flex-col">
        
        <div className="flex flex-col mb-8 laptop:mb-12">
          <span className="text-base font-semibold mb-2 text-dark-black">Email Address</span>
          <span className="text-dark-gray font-base text-sm leading-none tracking-wide">{user.email}</span>
        </div>
        
        {/* NEWSLETTER */}
        <div className="flex flex-col">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-dark-gray mb-4 laptop:mb-3 font-stretch-110%">Preferences</h4>
          
          {/* gap-6 na mobile, shrink-0 na switchu zapobiega jego zgnieceniu przez tekst */}
          <div className="flex items-center justify-between gap-6 laptop:gap-10">
            <div className='flex flex-col'>
              <p className="text-base font-semibold mb-2 text-dark-black leading-none">Waitlist & Newsletter</p>
              <p className="text-dark-gray font-base text-sm leading-5 tracking-wide text-pretty">Receive updates about new articles and early access to premium features.</p>
            </div>
            
            <div className="shrink-0">
              <NewsletterToggle isOptedIn={user.newsletterOptIn} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}