import Image from "next/image"

type ClientImageProps = {
  imageSource: string;
  imageDescription: string;
  imageAlt: string;
  imageUrl: string;
}

export const ClientImage = ({data}:{data:ClientImageProps}) => {
  const {imageAlt, imageDescription, imageSource, imageUrl} = data
  const url = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${imageUrl}`;

  return (
    <figure className="mt-2 mb-8">
      <div className="relative w-full max-w-103 ms-auto me-auto tablet:max-w-none tablet:w-172 laptop:w-225 aspect-video rounded-2xl overflow-clip laptop:max-h-85">
        <Image
          src={url} 
          alt={imageAlt } 
          fill 
          className="object-contain"
        />
      </div>
      <figcaption className="mt-3 max-w-91.5 leading-4 font-semibold text-xs text-dark-gray/80 font-stretch-110% w-[86.5%] ms-auto me-auto tablet:max-w-none tablet:w-143 laptop:w-162">
        {imageDescription}
      </figcaption>
    </figure>
  )
}