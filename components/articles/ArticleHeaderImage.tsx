import Image from "next/image"

type ArticleHeaderImageProps = {
    thumbnailUrl:string, 
    thumbnailAlt:string, 
    thumbnailAnnotaion:string, 
    thumbnailDescription: string
}

export const ArticleHeaderImage = ({thumbnailUrl, thumbnailAlt, thumbnailDescription}:ArticleHeaderImageProps) => {
    const url = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${thumbnailUrl}`;

    return (
        <div className="w-full mx-auto mb-3"> 
            <div className="relative overflow-clip h-59.5 w-100.5 tablet:h-102.5 tablet:w-173 mx-auto mobile:rounded-xl laptop:w-245 laptop:h-145">
                <Image 
                    src={url}
                    alt={thumbnailAlt}
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
            <p className="px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto pt-2.5 tablet:pt-4 text-pretty text-xxs leading-relaxed text-dark-gray font-semibold">{thumbnailDescription}</p>
      </div>
  )
}