import { NextResponse } from "next/server";
import { uploadImageToS3 } from "@/server/s3";
import { db } from "@/server/db";
import { books } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allBooks = await db.query.books.findMany({
      orderBy: [desc(books.createdAt)]
    });
    return NextResponse.json(allBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const authorId = Number(formData.get("authorId") as string);
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const bookAuthor = formData.get("bookAuthor") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const content = formData.get("content") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const status = formData.get("status") as string;

    const bookCoverFile = formData.get("bookCoverFile") as File | null;
    let bookCover = "";

    if (bookCoverFile && bookCoverFile.name) {
      const key = await uploadImageToS3({
        file: bookCoverFile,
        articleId: id,
        bucketFolder: "books"
      });
      bookCover = key.key;
    }

    const bookCoverAlt = formData.get("bookCoverAlt") as string;

    const result = await db.insert(books).values({
      id,
      authorId,
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      bookCover,
      bookCoverAlt,
      bookAuthor: { name: bookAuthor },
      category,
      author: { name: author },
      content: { text: content },
      publishedAt: new Date(publishedAt),
      status,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const bookAuthor = formData.get("bookAuthor") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const content = formData.get("content") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const status = formData.get("status") as string;
    const bookCoverAlt = formData.get("bookCoverAlt") as string;

    const bookCoverFile = formData.get("bookCoverFile") as File | null;
    let updateData: any = {
      title,
      bookAuthor: { name: bookAuthor },
      category,
      author: { name: author },
      content: { text: content },
      publishedAt: new Date(publishedAt),
      status,
      bookCoverAlt,
    };

    if (bookCoverFile && bookCoverFile.name) {
      const key = await uploadImageToS3({
        file: bookCoverFile,
        articleId: id,
        bucketFolder: "books"
      });
      updateData.bookCover = key.key;
    }

    const result = await db.update(books)
      .set(updateData)
      .where(eq(books.id, id))
      .returning();

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}
