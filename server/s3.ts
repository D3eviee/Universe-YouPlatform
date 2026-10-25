import {DeleteObjectsCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"

const BUCKET = process.env.BUCKET;
if (!BUCKET) throw new Error("BUCKET env variable is not set");

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

/** --- Returns an error, or null if the file is an acceptable image. --- */
export function assertImage(file: File): string | null {
  if (!ALLOWED_TYPES[file.type]) return `Unsupported file type: ${file.type || "unknown"}`;
  if (file.size > MAX_SIZE) return "File size limit exceeded (10MB)";
  return null;
}

/** --- Uploads image and returns its S3 key. Throws on failure. --- */
export async function uploadToS3(file: File, folder: "articles" | "books", entityId: string) {
    const problem = assertImage(file);
    if (problem) throw new Error(problem);
    
    const key = `${folder}/${entityId}/${crypto.randomUUID()}.${ALLOWED_TYPES[file.type]}`;
    
    await s3.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: Buffer.from(await file.arrayBuffer()),
            ContentType: file.type,
        }),
    );
    return key;
}

/** Deletes S3 objects by key. Logs instead of throwing. Used during clean-up. */
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