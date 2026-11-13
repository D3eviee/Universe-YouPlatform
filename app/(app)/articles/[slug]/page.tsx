import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArticleHeader } from "@/components/client/articles/ArticleHeader";
import { ArticleHeaderImage } from "@/components/client/articles/ArticleHeaderImage";
import { BlockRenderer } from "@/components/client/renderer/BlockRenderer";
import { getCurrentUser } from "@/lib/auth";
import { imageUrl } from "@/lib/image-url";
import { getPublicArticleBySlug, checkIsArticleSaved } from "@/server/queries/articles";
import { MoreContentCta } from "@/components/ui/MoreContentCta";

type Props = { params: Promise<{ slug: string }> };

const getArticle = cache(getPublicArticleBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };

  const image = imageUrl(article.thumbnailImage);
  return {
    title: article.title,
    description: article.subtitle || undefined,
    openGraph: {
      title: article.title,
      description: article.subtitle || undefined,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      images: image ? [{ url: image, alt: article.thumbnailAlt }] : undefined,
    },
  };
}

export default async function SingleArticlePage({ params }: Props) {
  const { slug } = await params;

  const [article, user] = await Promise.all([getArticle(slug), getCurrentUser()]);
  if (!article) notFound();

  const isSaved = user ? await checkIsArticleSaved(user.id, article.id) : false;

  return (
    <article className="w-full flex flex-col">
      <ArticleHeader
        category={article.category}
        publishedAt={article.publishedAt}
        subtitle={article.subtitle}
        title={article.title}
        articleId={article.id}
        slug={slug}
        isSaved={isSaved}
        isLoggedIn={!!user}
      />
      <ArticleHeaderImage
        thumbnailKey={article.thumbnailImage}
        thumbnailAlt={article.thumbnailAlt}
        thumbnailDescription={article.thumbnailDescription}
        thumbnailAnnotaion={article.thumbnailAnnotaion}
      />
      <BlockRenderer blocks={article.blocks} />
      <MoreContentCta />
    </article>
  );
}