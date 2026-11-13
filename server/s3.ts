import "server-only";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { DeleteObjectsCommand, DeleteObjectTaggingCommand, PutObjectTaggingCommand, S3Client } from "@aws-sdk/client-s3";
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, type ImageType, type UploadFolder } from "@/lib/constants/image-uploads";

const BUCKET = process.env.BUCKET;
if (!BUCKET) throw new Error("BUCKET env variable is not set");

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Every upload starts tagged status=pending. A bucket lifecycle rule deletes pending
// objects after 1 day. Saving an article/book removes the tag from the images it uses,
// so only images that were uploaded but never saved disappear.
const PENDING_TAGGING = "<Tagging><TagSet><Tag><Key>status</Key><Value>pending</Value></Tag></TagSet></Tagging>";
const UPLOAD_URL_TTL_SECONDS = 5 * 60;

// Creates a one-time upload form for a single image.
export async function createUploadUrl(folder: UploadFolder, entityId: string, contentType: ImageType) {
  const key = `${folder}/${entityId}/${crypto.randomUUID()}.${IMAGE_EXTENSIONS[contentType]}`;

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: BUCKET!,
    Key: key,
    Fields: { "Content-Type": contentType, tagging: PENDING_TAGGING },
    Conditions: [
      ["content-length-range", 1, MAX_IMAGE_SIZE],
      ["eq", "$Content-Type", contentType],
      ["eq", "$tagging", PENDING_TAGGING],
    ],
    Expires: UPLOAD_URL_TTL_SECONDS,
  });

  return { key, url, fields };
}

// Removes the pending tag, so the lifecycle rule keeps these images.
const isNoSuchKey = (error: unknown) => (error as { name?: string })?.name === "NoSuchKey";

export async function markAsUsed(keys: string[]): Promise<{ missing: string[] }> {
  const results = await Promise.allSettled(
    keys.map((Key) => s3.send(new DeleteObjectTaggingCommand({ Bucket: BUCKET, Key }))),
  );

  const missing: string[] = [];
  for (const [i, r] of results.entries()) {
    if (r.status === "fulfilled") continue;
    if (isNoSuchKey(r.reason)) missing.push(keys[i]);
    else throw r.reason;
  }
  return { missing };
}

// Puts the pending tag back (used when a save fails after markAsUsed)
export async function markAsPending(keys: string[]) {
  await Promise.allSettled(
    keys.map((Key) =>
      s3.send(
        new PutObjectTaggingCommand({
          Bucket: BUCKET,
          Key,
          Tagging: { TagSet: [{ Key: "status", Value: "pending" }] },
        }),
      ),
    ),
  );
}

// Deletes S3 objects by key. Used during clean-up.
export async function deleteFromS3(keys: string[]) {
  if (!keys.length) return;
  try {
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: { Objects: keys.map((Key) => ({ Key })) },
      }),
    );
  } catch (error) {
    console.error("[S3] Failed to delete objects", keys, error);
  }
}