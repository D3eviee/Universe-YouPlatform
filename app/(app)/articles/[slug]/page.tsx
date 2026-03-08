import ArticleHeader from "@/components/articles/ArticleHeader";
import ArticleHeaderImage from "@/components/articles/ArticleHeaderImage";
import ArticleMoreNewsTab from "@/components/articles/ArticleMoreNewsTab";
import BlockRenderer from "@/components/BlockRenderer";
import { db } from "@/server/db";
import { notFound } from "next/navigation";

export default async function SingleArticlePage({ params }: {params: { slug: string };}) {
  const { slug } = await params; 

  const article = await db.query.articles.findFirst({
    where: (table, { eq, and }) => and(
      eq(table.slug, slug),
      eq(table.status, "public")
    ),
    columns:{
      category: true,
      publishedAt: true,
      title: true,
      subtitle: true,
      thumbnailImage: true,
      thumbnailAlt: true,
      thumbnailDescription: true,
      thumbnailAnnotaion: true,
      blocks: true,
    }
  });

  if (!article) notFound(); 

  const {blocks, category, publishedAt, subtitle, thumbnailAlt, thumbnailAnnotaion, thumbnailDescription, title, thumbnailImage} = article
  
  return (
    <article className="w-full flex flex-col">
      <ArticleHeader category={category || "NEWS"} publishedAt={publishedAt} subtitle={subtitle} title={title}/>
      <ArticleHeaderImage thumbnailUrl={thumbnailImage} thumbnailAlt={thumbnailAlt} thumbnailDescription={thumbnailDescription} thumbnailAnnotaion={thumbnailAnnotaion} />
      <BlockRenderer blocks={blocks}/>
      <ArticleMoreNewsTab/>
    </article>
  );
}

        
      