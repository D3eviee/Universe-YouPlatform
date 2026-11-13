/** Turns an S3 key into a full URL, or null when there's no image. */
export function imageUrl(key: string | null | undefined): string | null {
  if (!key) return null;
  return `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${key}`;
}