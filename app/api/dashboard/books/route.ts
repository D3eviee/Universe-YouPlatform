import { NextResponse } from "next/server";
import { uploadImageToS3 } from "@/server/s3";
import { db } from "@/server/db";
import { books } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allArticles = await db.query.books.findMany({orderBy: [desc(books.createdAt)]});
    return NextResponse.json(allArticles, { status: 200 });
  } catch (error) {
    console.error("Błąd pobierania artykułów:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać artykułów" }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const rawAuthorId = formData.get("authorId") as string;
    const authorId = Number(rawAuthorId)
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const status = formData.get("status") as string;
    const category = formData.get("category") as string;
    const bookAuthor = formData.get("bookAuthor") as string;
    const bookCoverAlt = formData.get("bookCoverAlt") as string;
    const bookCoverAnnotation = formData.get("bookCoverAnnotation") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const blocksString = formData.get("blocks") as string;
    const blocks = blocksString ? JSON.parse(blocksString) : [];
  
    // BOOK COVER IMAGE PROCESSING
    const coverImageFile= formData.get("bookCover") as File | null;
    let bookCover;

    if (coverImageFile && coverImageFile.name) {
      const key = await uploadImageToS3({file: coverImageFile, articleId: id, bucketFolder: "books" })
      bookCover = key.key;
    }

    const uploadedBlockImages: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image-") && value instanceof File) {
        const keyS3 = await uploadImageToS3({file: value, articleId: id, bucketFolder: "books" })
        uploadedBlockImages[key] = `${keyS3.key}`;
      }
    }

    const updatedBlocks = blocks.map((block: any) => {
      if (block.type === "image") {
        const imageKey = `image-${block.id}`;
        if (uploadedBlockImages[imageKey]) {
          return {
            ...block,
            data: { ...block.data, imageUrl: uploadedBlockImages[imageKey] }
          };
        }
      }
      return block;
    });


    const result = await db.insert(books).values({
      id,
      authorId,
      createdAt: new Date(),
      title,
      bookCoverAnnotation,
      blocks: updatedBlocks,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      bookCover,
      subtitle,
      bookCoverAlt,
      bookAuthor,
      category,
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
    const rawAuthorId = formData.get("authorId") as string;
    const authorId = Number(rawAuthorId)
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const status = formData.get("status") as string;
    const category = formData.get("category") as string;
    const bookAuthor = formData.get("bookAuthor") as string;
    const bookCoverAlt = formData.get("bookCoverAlt") as string;
    const bookCoverAnnotation = formData.get("bookCoverAnnotation") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const blocksString = formData.get("blocks") as string;
    const blocks = blocksString ? JSON.parse(blocksString) : [];


    // BOOK COVER IMAGE PROCESSING
    const coverImageFile= formData.get("bookCover") as File | null;
    let bookCover;

    if (coverImageFile && coverImageFile.name) {
      const key = await uploadImageToS3({file: coverImageFile, articleId: id, bucketFolder: "books" })
      bookCover = key.key;
    }

    const uploadedBlockImages: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image-") && value instanceof File) {
        const keyS3 = await uploadImageToS3({file: value, articleId: id, bucketFolder: "books" })
        uploadedBlockImages[key] = `${keyS3.key}`;
      }
    }

    const updatedBlocks = blocks.map((block: any) => {
      if (block.type === "image") {
        const imageKey = `image-${block.id}`;
        if (uploadedBlockImages[imageKey]) {
          return {
            ...block,
            data: { ...block.data, imageUrl: uploadedBlockImages[imageKey] }
          };
        }
      }
      return block;
    });

    const result = await db.update(books).set({
      id,
      authorId,
      createdAt: new Date(),
      title,
      bookCoverAnnotation,
      blocks: updatedBlocks,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      bookCover,
      subtitle,
      bookCoverAlt,
      bookAuthor,
      category,
      publishedAt: new Date(publishedAt),
      status,
    })
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
