import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSavedArticles } from '@/server/queries/users';
import { getCurrentUser } from '@/lib/session';
import ArticleThumbnail from '@/components/ArticleThumbnail';
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
    <section className="w-full flex flex-col h-full">
      <h1 className="text-2xl font-medium leading-tight mb-8">Saved content</h1>

      {savedItems.length === 0 ? (
        // STAN PUSTY
        <div className="bg-light-gray px-12 py-10 rounded-4xl flex flex-col">
          <p className="text-3xl font-serif font-semibold mb-2">Your library is empty.</p>
          <p className="text-dark-gray font-base mb-6 text-sm leading-relaxed">
            You haven't saved any articles yet. Explore our latest stories and build your personal collection of interactive learning materials.
          </p>

          <Link 
            href="/articles" 
            className="w-fit bg-dark-black text-white px-9 py-3 text-14 rounded-2xl hover:bg-dark-black/90 transition-colors cursor-pointer"
          >
            Explore  <span>&rarr;</span>
          </Link>
        </div>
        ) : (
        // SAVED ARTICLES ITEMS
        <div className="w-full flex flex-col min-w-2/3 max-w-2/3 gap-6">
          {savedItems.map(({ article }) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`}
              className="group w-full flex flex-row border-[0.5px] border-gray-300 rounded-4xl hover:border-spanish-gray transition-all duration-300"
            >
              <div className='relative w-35 h-35 overflow-clip rounded-l-4xl aspect-square'>
                <Image
                  src={process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+article.thumbnailImage}
                  fill
                  objectFit='cover'
                  alt="article thumbnail"
                />
              </div>
            
              <div className='flex flex-col h-full justify-between w-full p-4'>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-dark-gray mb-2">{getCategoryInfo(article.category!).label}</span>
                  <h3 className="text-xl mb-2 text-dark-black font-semibold">{article.title}</h3>
                </div>

                <div className='relative text-aqua-dark font-base  rounded-xl group-hover:font-semibold transition-all duration-300'> Read &rarr;</div>
              </div>
              
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

 