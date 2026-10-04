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
    <section className="flex flex-col h-full font-sans">
      <h1 className="text-2xl font-medium leading-tight mb-8">Account</h1>
      
      {/* PERSONAL DATA */}
      <div className="bg-light-gray px-12 py-10 rounded-4xl flex flex-col">
        <div className="flex flex-col mb-12">
          <span className="text-base font-semibold mb-0.5">Email Address</span>
          <span className="text-dark-gray font-base text-sm leading-relaxed">{user.email}</span>
        </div>
        
        {/* NEWSLETTER */}
        <div className="flex flex-col">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-dark-gray mb-3">Preferences</h4>
          
          <div className="flex items-center justify-between gap-10">
            <div className='flex flex-col'>
              <p className="text-base font-semibold">Waitlist & Newsletter</p>
              <p className="text-dark-gray font-base text-sm leading-relaxed">Receive updates about new articles and early access to premium features.</p>
            </div>
            
            <NewsletterToggle isOptedIn={user.newsletterOptIn} />
          </div>
        </div>
      </div>
    </section>
  );
}