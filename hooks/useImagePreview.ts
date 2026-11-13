'use client';
import { useEffect, useState } from "react";
import { imageUrl } from "@/lib/image-url";

/* A URL to preview an image value: a picked File or a saved S3 key. */
export function useImagePreview(value: File | string | null | undefined): string | null {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    
    useEffect(() => {
        if (!(value instanceof File)) {
            setObjectUrl(null);
            return;
        }
        const url = URL.createObjectURL(value);
        setObjectUrl(url);
        return () => URL.revokeObjectURL(url); // freed when the file changes or the input unmounts
  }, [value]);

  if (value instanceof File) return objectUrl;
  return imageUrl(typeof value === "string" ? value : null);
}