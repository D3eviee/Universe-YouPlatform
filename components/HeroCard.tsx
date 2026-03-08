import { format } from "date-fns"
import Image from "next/image"

type Article = {
  id: string
  slug: string,
  title: string
  thumbnailAlt: string
  thumbnailImage: string
  category: string | null
  publishedAt: Date,
}

const HeroCard = ({article}:{article:Article}) => {
  const { publishedAt, title, slug, thumbnailAlt, thumbnailImage } = article
  const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`
  const imageUrl = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${thumbnailImage}`;

  return (
    <a 
      href={`/articles/${slug}`}
      className="w-full h-full flex shrink-0 relative rounded-3xl overflow-hidden p-5.5 tablet:h-91 tablet:max-w-83.25 tablet:first-of-type:h-94 tablet:first-of-type:max-w-full tablet:first-of-type:w-full laptop:first-of-type:h-118 laptop:max-w-119.25"
    >
      <div className="w-full h-full"> 
        <Image
          src={imageUrl}
          fill
          alt={thumbnailAlt}
          className="w-full object-cover"
        />
      </div>
      
      <div className="z-10 h-fit absolute bottom-5.5  flex flex-col gap-2 text-white">
        <p className="w-fit h-fit py-0.5 px-2 rounded-lg bg-[#4D6F00] text-xs flex justify-center items-center font-bold text-shadow-2xs">{article.category && article.category.toUpperCase()}</p>
        <h2 className="font-semibold text-2xl mr-4">{title}</h2>
        <p className="text-xs font-bold">{publishedAtForrmated}</p>
      </div>
      <div className="top-0 left-0 absolute bg-black/40 h-full w-full"/>
    </a>
  )
}

export default HeroCard

