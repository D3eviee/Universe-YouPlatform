import type { EditorBlock, StoredBlock } from "@/lib/schemas/blocks";
import { MAX_FILES_PER_REQUEST, MAX_IMAGE_SIZE, isImageType, type UploadFolder } from "@/lib/constants/image-uploads";
import { UploadError } from "./api-errors";

type UploadTarget = { key: string; url: string; fields: Record<string, string> };

/* Throws an UploadError error if the file can't be uploaded. */
function checkFile(file: File) {
  if (!isImageType(file.type)) throw new UploadError(`${file.name}: unsupported file type (${file.type || "unknown"})`);
  if (file.size > MAX_IMAGE_SIZE) throw new UploadError(`${file.name}: larger than 10 MB`);
  if (file.size === 0) throw new UploadError(`${file.name}: file is empty`);
}

async function requestUploadTargets(folder: UploadFolder, entityId: string, files: File[]) {
  const res = await fetch("/api/dashboard/uploads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder, entityId, files: files.map((f) => ({ type: f.type, size: f.size })) }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new UploadError(json.error ?? "Could not prepare the upload");
  return json.uploads as UploadTarget[];
}

async function uploadToS3(target: UploadTarget, file: File) {
  const form = new FormData();
  for (const [name, value] of Object.entries(target.fields)) form.append(name, value);
  form.append("file", file);

  const res = await fetch(target.url, { method: "POST", body: form });
  if (!res.ok) throw new UploadError(`${file.name}: upload failed`);
}

/* Upload all images from editor to S3, If already in S3 keys are kept */
export async function uploadEditorImages( folder: UploadFolder, entityId: string, content: { cover: File | string ; blocks: EditorBlock[] } )
  : Promise<{ cover: string; blocks: StoredBlock[] }> {
    // Collect all image files into one array (cover, photo block and gallery block)
    const files: File[] = [];
    const collect = (v: File | string) => { if (v instanceof File && !files.includes(v)) files.push(v); }
    collect(content.cover);
    
    for (const block of content.blocks) {
      if (block.type === "image") collect(block.data.imageFile);
      if (block.type === "gallery") block.data.images.forEach((img) => collect(img.imageFile));
    }
    
    // Check images before uploading - size, extenstion, is empty
    files.forEach(checkFile);
    
    // Get upload urls and upload images straight to S3
    const keys = new Map<File, string>();
    for (let i = 0; i < files.length; i += MAX_FILES_PER_REQUEST) {
      const batch = files.slice(i, i + MAX_FILES_PER_REQUEST);
      const targets = await requestUploadTargets(folder, entityId, batch);
      await Promise.all(batch.map((file, j) => uploadToS3(targets[j], file)));
      batch.forEach((file, j) => keys.set(file, targets[j].key));
    }
    
    // replace all blocks with image key 
    const resolve = (v: File | string): string => (v instanceof File ? keys.get(v)! : typeof v === "string" ? v : "");
    
    const blocks = content.blocks.map((block) => {
      if (block.type === "image") return { ...block, data: { ...block.data, imageFile: resolve(block.data.imageFile) } };
      if (block.type === "gallery")
        return {...block, data: { ...block.data, images: block.data.images.map((img) => ({ ...img, imageFile: resolve(img.imageFile) })) }};
      return block;
    }) as StoredBlock[];

  return { cover: resolve(content.cover), blocks };
}
