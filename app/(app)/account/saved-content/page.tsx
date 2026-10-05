import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSavedArticles } from '@/server/queries/users';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';

const CATEGORIES_LABELS = [
    {label: "Science & Tech", value: "science-and-tech", color: "#3B82F6"}, 
    {label: "News & Politics", value: "news-and-politics", color: "#DC2626"}, 
    {label: "Entertainment", value: "entertainment", color: "#8B5CF6"}, 
    {label: "Money & Business", value: "money-and-business", color: "#10B981"}, 
    {label: "Sport", value: "sport", color: "#F97316"}, 
    {label: "Music", value: "music", color: "#EC4899"}, 
    {label: "History", value: "history", color: "#B45309"}, 
    {label: "Health", value: "health", color: "#14B8A6"}, 
    {label: "Cars", value: "cars", color: "#64748B"}, 
    {label: "Coding", value: "coding", color: "#1E293B"}  
]

function getCategoryInfo(categoryValue: string) {
  return CATEGORIES_LABELS.find(c => c.value === categoryValue) || { label: categoryValue, color: "#6E6E73" };
}

export default async function SavedContentPage() {
  
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const savedItems = await getSavedArticles(user.id as string);
  
  return (
    <section className="flex flex-col h-full">
      <h1 className="text-xl font-medium leading-none mb-6 laptop:mb-8">Saved</h1>

      {savedItems.length === 0 ? (
        <div className="bg-light-gray p-6 laptop:px-12 laptop:py-10 rounded-4xl flex flex-col">
          <p className="text-2xl tablet:text-3xl font-medium mb-2">Your library is empty.</p>
          <p className="text-dark-gray font-base text-sm leading-6 tracking-wide text-pretty mb-8">
            You haven't saved any articles yet. Explore our latest stories and build your personal collection of interactive learning materials.
          </p>

          <Link 
            href="/articles" 
            className="w-full tablet:w-fit bg-linear-to-bl to-dark-black from-primary text-white px-6 py-3.5 tablet:py-3 text-[15px] tablet:text-14 rounded-2xl hover:bg-dark-black/90 transition-colors cursor-pointer text-center"
          >
            Explore <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      ) : (
        // SAVED ARTICLES ITEMS
        <div className="w-full tablet:min-w-[66%] tablet:max-w-[66%] flex flex-col gap-6">
          {savedItems.map(({ article }) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`}
              className="group w-full flex flex-row border-[0.5px] border-spanish-gray rounded-3xl tablet:rounded-4xl hover:border-spanish-gray transition-all duration-300"
            >
              <div className='relative w-35 h-35 tablet:w-35 tablet:h-35 overflow-hidden rounded-l-3xl tablet:rounded-l-4xl aspect-square shrink-0'>
                <Image
                  src={process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+article.thumbnailImage}
                  fill
                  className="object-cover"
                  alt="article thumbnail"
                />
              </div>
            
              <div className='flex flex-col h-full justify-between w-full px-3 py-4 tablet:p-4'>
                <div className="flex flex-col">
                  <span className="text-[11px] font-base font-stretch-115% uppercase text-dark-gray mb-2.5 leading-none line-clamp-1">{getCategoryInfo(article.category!).label}</span>
                  <h3 className="text-lg tablet:text-xl text-dark-black font-semibold line-clamp-2 leading-6 tablet:leading-6.5">{article.title}</h3>
                </div>

                <div className='relative text-aqua-dark font-base text-14 group-active:font-semibold group-hover:font-semibold transition-all duration-300'> Read &rarr; </div>
              </div>
              
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}