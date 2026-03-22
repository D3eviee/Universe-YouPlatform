import { ArticleThumbnail as ArtilceThumbnailType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import CategoryBadge from "./CategoryBadge"

const ArticleThumbnail = ({article}: {article:ArtilceThumbnailType}) => {
    const {title, publishedAt, slug, category } = article
    const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`

    return (
        <li role="listitem" className="w-full gap-3 py-8 hover:cursor-pointer laptop:w-1/2 laptop:pr-14 list-none group">
            <a className="w-full flex flex-row" href={`/articles/${slug}`} >
                <div className="relative thumbnail-image   ">
                    <Image
                        src={process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+article.thumbnailImage}
                        alt={article.thumbnailAlt || article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-200 "
                    />
                </div>
                <div className="flex flex-col justify-center pl-4 laptop:pl-7">
                    <div>
                       <CategoryBadge value={category!}/>
                        <h3 className="thumbnail-title">{title}</h3>
                    </div>
                    <p className="thumbnail-info">{publishedAtForrmated}</p>
                </div>
            </a>
        </li>
    )
}

export default ArticleThumbnail