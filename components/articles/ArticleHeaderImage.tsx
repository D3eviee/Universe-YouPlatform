import Image from "next/image"

type ArticleHeaderImageProps = {
    thumbnailUrl:string, 
    thumbnailAlt:string, 
    thumbnailAnnotaion:string, 
    thumbnailDescription: string
}

const ArticleHeaderImage = ({thumbnailUrl, thumbnailAlt, thumbnailAnnotaion, thumbnailDescription}:ArticleHeaderImageProps) => {
    const url = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${thumbnailUrl}`;

    return (
        <div className="w-full max-w-full ms-auto me-auto tablet:max-w-none tablet:w-172 laptop:w-245"> 
            <div className="relative aspect-video overflow-clip tablet:rounded-2xl ">
            <Image 
                src={url}
                alt={thumbnailAlt}
                fill 
                className="object-cover"
            />
        </div>
    
        <div className="mt-3 font-semibold text-xs text-light-gray/80 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162">
            {thumbnailDescription} 
        </div>
      </div>
  )
}

export default ArticleHeaderImage