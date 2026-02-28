import { NextResponse } from "next/server";
import { uploadImageToS3 } from "@/app/server/s3";
import { db } from "@/app/server/db";
import { articles } from "@/app/server/schema";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const rawAuthorId = formData.get("authorId") as string;
    const authorId = Number(rawAuthorId)
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const status = formData.get("status") as "draft" | "public" | "archived";
    const priority = formData.get("priority") as "normal" | "hero1" | "hero2" | "hero3";
    const thumbnailDescription = formData.get("thumbnailDescription") as string;
    const thumbnailAlt = formData.get("thumbnailAlt") as string;
    const thumbnailAnnotaion = formData.get("thumbnailAnnotaion") as string;
    const category = formData.get("category") as string;
    const publishedAt = formData.get("publishedAt") as string;

    const blocksString = formData.get("blocks") as string;
    const blocks = blocksString ? JSON.parse(blocksString) : [];

    // THUMBNAIL IMAGE PROCESSING
    const thumbnailImg = formData.get("thumbnailFile") as File | null;
    let thumbnailImage;

    if (thumbnailImg && thumbnailImg.name) {
      const key = await uploadImageToS3({file: thumbnailImg, articleId: id, bucketFolder: "articles" })
      thumbnailImage = key.key;
    }
    
    const uploadedBlockImages: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image-") && value instanceof File) {
        const keyS3 = await uploadImageToS3({file: value, articleId: id, bucketFolder: "articles" })
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

    const slug = title.trim().replaceAll(" ", "-").toLowerCase()

    // TO DO -- SAVING ARTICLE TO DB
   await db.insert(articles).values({
    id,
    title: title.trim(), 
    subtitle: subtitle.trim(), 
    slug,
    authorId, 
    category,
    thumbnailImage, 
    thumbnailAlt, 
    thumbnailAnnotaion, 
    thumbnailDescription,
    status,
    priority,
    blocks: updatedBlocks,
    publishedAt: new Date(publishedAt)
  });

    return NextResponse.json(
      { success: true, message: "Artykuł zapisany!", thumbnailImage },
      { status: 201 }
    );

  } catch (error) {
    console.error("Błąd zapisu artykułu:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas przetwarzania danych." },
      { status: 500 }
    );
  }
}