import { format } from "date-fns"
import Image from "next/image"
import CategoryBadgeColor from "./CategoryBadgeColor"

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
  const { publishedAt, title, slug, thumbnailAlt, thumbnailImage, category } = article
  const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`
  const imageUrl = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${thumbnailImage}`;

  return (
    <a 
      href={`/articles/${slug}`}
      className="w-full h-full flex shrink-0 relative rounded-3xl overflow-hidden p-5.5 
      tablet:h-91 tablet:max-w-83.25 tablet:first-of-type:h-94 tablet:first-of-type:max-w-full tablet:first-of-type:w-full 
      laptop:first-of-type:h-114 laptop:max-w-119.25"
    >
      <div className="w-full h-full"> 
        <Image
          src={imageUrl}
          fill
          alt={thumbnailAlt}
          className="w-full object-cover object-center"
        />
      </div>
      
      <div className="absolute w-full h-fit z-10 bottom-0 left-0 pl-6 pr-6 pb-6 flex flex-col">
        <CategoryBadgeColor value={category!} styles="hero-category"/>
        <h2 className="hero-title text-pretty">{title}</h2>
        <p className="hero-date">{publishedAtForrmated}</p>
      </div>
      <div className="top-0 left-0 absolute bg-black/40 h-full w-full"/>
    </a>
  )
}

export default HeroCard

