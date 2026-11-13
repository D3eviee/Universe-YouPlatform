import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createUploadUrl } from "@/server/s3";
import { parseJsonBody } from "@/server/content/parse";
import { denied, errorResponse } from "@/server/http";
import { IMAGE_TYPES, MAX_FILES_PER_REQUEST, MAX_IMAGE_SIZE, UPLOAD_FOLDERS } from "@/lib/constants/image-uploads";

const uploadRequestSchema = z.object({
  folder: z.enum(UPLOAD_FOLDERS),
  entityId: z.uuid(),
  files: z
    .array(
      z.object({
        type: z.enum(IMAGE_TYPES),
        size: z.number().int().positive().max(MAX_IMAGE_SIZE, "File size limit exceeded (10MB)"),
      }),
    )
    .min(1)
    .max(MAX_FILES_PER_REQUEST),
});

/**
 * Validates data and uploads each file straight to S3
 * Request:  { folder: "articles", entityId: "<uuid>", files: [{ type: "image/png", size: 12345 }] }
 * Response: { uploads: [{ key, url, fields }] }   (same order as `files`)
 */
export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const { folder, entityId, files } = await parseJsonBody(req, uploadRequestSchema);
    const uploads = await Promise.all(files.map((f) => createUploadUrl(folder, entityId, f.type)));
    return NextResponse.json({ uploads });
  } catch (error) {
    return errorResponse(error, "Error while preparing uploads");
  }
}