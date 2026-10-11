import { Image as ImageType } from "@/types";
import Image from "next/image"


export const ClientImage = ({data}:{data:ImageType}) => {
  const {imageAlt, imageDescription, imageSource } = data
  const url = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${imageSource}`;

  return (
    <figure className="w-full mx-auto mb-8">
      <div className="relative overflow-clip h-59.5 w-100.5 tablet:h-102.5 tablet:w-173 mx-auto mobile:rounded-xl laptop:w-245 laptop:h-145">
        <Image
          src={url} 
          alt={imageAlt } 
          fill 
          className="object-contain"
        />
      </div>
      <figcaption className="w-90.5 tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 text-pretty text-xxs leading-relaxed text-dark-gray font-semibold">{imageDescription}</figcaption>
    </figure>
  )
}
