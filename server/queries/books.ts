import { db } from "@/server/db";

/* All public, published books, newest first */
export async function getBooks() {
  return db.query.books.findMany({
    where: (t, { eq, and, lte }) => and(eq(t.status, "public"), lte(t.publishedAt, new Date())),
    columns: {
      id: true,
      slug: true,
      title: true,
      bookAuthor: true,
      bookCover: true,
      category: true,
      publishedAt: true,
    },
    orderBy: (t, { desc }) => [desc(t.publishedAt), desc(t.id)],
  });
}

/* One public, published book by its slug */
export async function getSingleBook(slug: string) {
  return db.query.books.findFirst({
    where: (t, { eq, and, lte }) => and(
      eq(t.slug, slug),
      eq(t.status, "public"),
      lte(t.publishedAt, new Date()),
    ),
    columns: {
      title: true,
      subtitle: true,
      category: true,
      publishedAt: true,
      bookAuthor: true,
      bookCover: true,
      bookCoverAlt: true,
      bookCoverAnnotation: true,
      blocks: true,
    },
  });
}

/** The 3 newest public books (homepage). */
export async function getLatestBooks() {
  return db.query.books.findMany({
    where: (t, { eq, and, lte }) => and(eq(t.status, "public"), lte(t.publishedAt, new Date())),
    columns: {
      id: true,
      slug: true,
      title: true,
      bookAuthor: true,
      bookCover: true,
      category: true,
      publishedAt: true,
    },
    orderBy: (t, { desc }) => [desc(t.publishedAt), desc(t.id)],
    limit: 3,
  });
}