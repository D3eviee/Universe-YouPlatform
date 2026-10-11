import { ArticleHeader } from "@/components/articles/ArticleHeader";
import { ArticleHeaderImage } from "@/components/articles/ArticleHeaderImage";
import { ArticleMoreNewsTab } from "@/components/articles/ArticleMoreNewsTab";
import { BlockRenderer } from "@/components/BlockRenderer";
import { notFound } from "next/navigation"; 
import { getCurrentUser } from "@/lib/session";
import { getPublicArticleBySlug, checkIsArticleSaved } from "@/server/queries/articles";

export default async function SingleArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params; 
  
  const [article, user] = await Promise.all([
    getPublicArticleBySlug(slug),
    getCurrentUser()
  ]);

  if (!article) notFound(); 

  const isSaved = user ? await checkIsArticleSaved(user.id as string, article.id) : false;
  const { id, blocks, category, publishedAt, subtitle, thumbnailAlt, thumbnailAnnotaion, thumbnailDescription, title, thumbnailImage } = article;
  
  return (
    <article className="w-full flex flex-col">
      <ArticleHeader 
        category={category || "NEWS"} 
        publishedAt={publishedAt} 
        subtitle={subtitle} 
        title={title} 
        articleId={id} 
        slug={slug} 
        isSaved={isSaved}
        isLoggedIn={!!user}
      />
      <ArticleHeaderImage 
        thumbnailUrl={thumbnailImage} 
        thumbnailAlt={thumbnailAlt} 
        thumbnailDescription={thumbnailDescription} 
        thumbnailAnnotaion={thumbnailAnnotaion} 
      />
      
      <BlockRenderer blocks={blocks}/>
      <ArticleMoreNewsTab/>
    </article>
  );
}