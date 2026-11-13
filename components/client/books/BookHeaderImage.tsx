import Image from "next/image";
import { imageUrl } from "@/lib/image-url";

type BookHeaderImageProps = {
  coverKey: string;
  alt: string;
  annotation: string;
};

export const BookHeaderImage = ({ coverKey, alt, annotation }: BookHeaderImageProps) => {
  const src = imageUrl(coverKey);
  if (!src) return null;

  return (
    <figure className="w-full max-w-103 mx-auto tablet:max-w-none tablet:w-172 laptop:w-245">
      <div className="relative h-90 w-65 mx-auto laptop:w-80 laptop:h-110">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 320px, 260px"
          className="object-contain rounded-2xl"
        />
      </div>
      {annotation && (
        <figcaption className="mt-3 text-center text-xxs text-dark-gray font-semibold">{annotation}</figcaption>
      )}
    </figure>
  );
};