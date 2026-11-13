// Upload rules shared by the editor and the server.

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"] as const;
export type ImageType = (typeof IMAGE_TYPES)[number];

export const IMAGE_EXTENSIONS: Record<ImageType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_FILES_PER_REQUEST = 5; // the editor splits bigger batches

export const UPLOAD_FOLDERS = ["articles", "books"] as const
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const isImageType = (t: string): t is ImageType => (IMAGE_TYPES as readonly string[]).includes(t);
