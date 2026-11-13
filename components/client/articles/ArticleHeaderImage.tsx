import Image from "next/image";
import { imageUrl } from "@/lib/image-url";

type ArticleHeaderImageProps = {
  thumbnailKey: string;
  thumbnailAlt: string;
  thumbnailAnnotaion: string;
  thumbnailDescription: string;
};

export const ArticleHeaderImage = ({ thumbnailKey, thumbnailAlt, thumbnailAnnotaion, thumbnailDescription }: ArticleHeaderImageProps) => {
    const src = imageUrl(thumbnailKey);
    if (!src) return null;
    
    return (
        <figure className="w-full mx-auto mb-3">
            <div className="relative overflow-clip h-59.5 w-100.5 tablet:h-102.5 tablet:w-173 mx-auto mobile:rounded-xl laptop:w-245 laptop:h-145">
                <Image
                    src={src}
                    alt={thumbnailAlt || ""}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 1200px, 100vw"
                    className="object-cover"
                />
            </div>
            
            {(thumbnailDescription || thumbnailAnnotaion) && (
                <figcaption className="px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 text-pretty text-xxs leading-relaxed text-dark-gray font-semibold">
                    {thumbnailDescription}
                    {thumbnailAnnotaion && <span className="block opacity-70">{thumbnailAnnotaion}</span>}
                </figcaption>
            )}
        </figure>
    );
};