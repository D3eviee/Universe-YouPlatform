import { NextResponse } from "next/server";
import { uploadImageToS3 } from "@/server/s3";
import { db } from "@/server/db";
import { articles } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allArticles = await db.query.articles.findMany({orderBy: [desc(articles.createdAt)]});
    return NextResponse.json(allArticles, { status: 200 });
  } catch (error) {
    console.error("Błąd pobierania artykułów:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać artykułów" }, 
      { status: 500 }
    );
  }
}

// --- PROCESSES FORMDATA FROM ARTICLE DASHBOARD PAGE AND SAVES ARTICLE TO DB ---
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

    // --- THUMBNAIL IMAGE PROCESSING ---
    const thumbnailImg = formData.get("thumbnailFile") as File | null;
    let thumbnailImage;

    if (thumbnailImg && thumbnailImg.name) {
      const key = await uploadImageToS3({file: thumbnailImg, articleId: id, bucketFolder: "articles" })
      thumbnailImage = key.key;
    }
    
    const uploadedBlockImages: Record<string, string> = {};

    // --- GETTING FILES FOR SINGLE IMAGE AND GALLERY IMAGES ---
    for (const [key, value] of formData.entries()) {
       if ((key.startsWith("image-") || key.startsWith("gallery-")) && typeof value === 'object' && value !== null && 'name' in value) {
        const file = value as File;
        if (file.name && file.size > 0) {
            const keyS3 = await uploadImageToS3({file: file, articleId: id, bucketFolder: "articles" })
            uploadedBlockImages[key] = `${keyS3.key}`;
        }
      }
    }

    // MAPPING S3 KEYS TO DB BLOCKS
    const updatedBlocks = blocks.map((block: any) => {
      if (block.type === "image") {
        const imageKey = `image-${block.id}`;
        if (uploadedBlockImages[imageKey]) {
          return {
            ...block,
            data: { ...block.data, imageFile: uploadedBlockImages[imageKey] }
          };
        }
      } 
      
      // GALLERY
      else if (block.type === "gallery" && block.data.images) {
        const updatedImages = block.data.images.map((img: any, index: number) => {
          const galleryKey = `gallery-${block.id}-${index}`;
          if (uploadedBlockImages[galleryKey]) {
            return { ...img, imageFile: uploadedBlockImages[galleryKey] }
          }
          return img;
        });

        return { ...block, data: { ...block.data, images: updatedImages }};
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

// --- PROCESSES FORMDATA FROM ARTICLE DASHBOARD PAGE AND UPDATES ARTICLE IN DB ---
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    if (!id) return NextResponse.json({ error: "Id is missing" }, { status: 400 });

    const rawAuthorId = formData.get("authorId") as string;
    const authorId = Number(rawAuthorId);
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
  
    // --- THUMBNAIL IMAGE PROCESSING ---
    const thumbnailImg = formData.get("thumbnailFile") as File | null;
    let thumbnailImage;

    if (thumbnailImg && thumbnailImg.name) {
      const key = await uploadImageToS3({ file: thumbnailImg, articleId: id, bucketFolder: "articles" });
      thumbnailImage = key.key;
    }
    
    const uploadedBlockImages: Record<string, string> = {};

    // --- GETTING FILES FOR SINGLE IMAGE AND GALLERY IMAGES ---
    for (const [key, value] of formData.entries()) {
      // Bezpieczne sprawdzenie pliku skopiowane z funkcji POST
      if ((key.startsWith("image-") || key.startsWith("gallery-")) && typeof value === 'object' && value !== null && 'name' in value) {
        const file = value as File;
        if (file.name && file.size > 0) {
          const keyS3 = await uploadImageToS3({ file: file, articleId: id, bucketFolder: "articles" });
          uploadedBlockImages[key] = `${keyS3.key}`;
        }
      }
    }

    // --- MAPPING S3 KEYS TO DB BLOCKS ---
    const updatedBlocks = blocks.map((block: any) => {
      if (block.type === "image") {
        const imageKey = `image-${block.id}`;
        if (uploadedBlockImages[imageKey]) {
          return {
            ...block,
            data: { ...block.data, imageFile: uploadedBlockImages[imageKey] }
          };
        }
      } 
      else if (block.type === "gallery" && block.data.images) {
        const updatedImages = block.data.images.map((img: any, index: number) => {
          const galleryKey = `gallery-${block.id}-${index}`;
          if (uploadedBlockImages[galleryKey]) {
            return { ...img, imageFile: uploadedBlockImages[galleryKey] };
          }
          return img;
        });

        return { ...block, data: { ...block.data, images: updatedImages } };
      }
      return block;
    });

    const slug = title.trim().replaceAll(" ", "-").toLowerCase();

    // --- OMITTING UNDEFINED FIELDS IN DRIZZLE ---
    const updateData: any = {
        title: title.trim(), 
        subtitle: subtitle.trim(),
        status,
        authorId,
        category,
        priority,
        slug,
        publishedAt: new Date(publishedAt),
        thumbnailAlt,
        thumbnailAnnotaion,
        thumbnailDescription,
        blocks: updatedBlocks,
    };
    
    if (thumbnailImage) updateData.thumbnailImage = thumbnailImage;


    // --- SAVING ARTICLE TO DB ---
    await db.update(articles)
      .set(updateData)
      .where(eq(articles.id, id));

    return NextResponse.json({ success: true, message: "Zaktualizowano pomyślnie" });

  } catch (error) {
    console.error("Błąd aktualizacji artykułu:", error);
    return NextResponse.json(
      { error: "Nie udało się zaktualizować artykułu" }, 
      { status: 500 }
    );
  }
}