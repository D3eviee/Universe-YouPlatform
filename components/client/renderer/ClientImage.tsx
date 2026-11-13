import Image from "next/image";
import type { BlockData } from "@/lib/schemas/blocks";
import { imageUrl } from "@/lib/image-url";

export const ClientImage = ({ data }: { data: BlockData<"image"> }) => {
  const { imageFile, imageAlt, imageDescription, imageSource } = data;
  const src = imageUrl(imageFile);
  if (!src) return null; // an image block without an image: render nothing

  return (
    <figure className="w-full mx-auto mb-8">
      <div className="relative overflow-clip h-59.5 w-100.5 tablet:h-102.5 tablet:w-173 mx-auto mobile:rounded-xl laptop:w-245 laptop:h-145">
        <Image
          src={src}
          alt={imageAlt || ""}
          fill
          sizes="(min-width: 1024px) 980px, (min-width: 768px) 692px, 100vw"
          className="object-contain"
        />
      </div>

      {(imageDescription || imageSource) && (
        <figcaption className="w-90.5 tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 text-pretty text-xxs leading-relaxed text-dark-gray font-semibold">
          {imageDescription}
          {imageSource && <span className="block opacity-70">Source: {imageSource}</span>}
        </figcaption>
      )}
    </figure>
  );
};