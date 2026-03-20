import { ArticleThumbnail as ArtilceThumbnailType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import CategoryBadge from "../CategoryBadge"

const ArticleListItem = ({article}: {article:ArtilceThumbnailType}) => {
    const {title, publishedAt, slug, category } = article
    const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`

    return (
        <li role="listitem" className="w-full gap-3 my-6 hover:cursor-pointer list-none laptop:pr-14">
            <a className="w-full flex flex-row" href={`/articles/${slug}`} >
                <div className="relative w-27 h-27 laptop:w-32 laptop:h-32 shrink-0 rounded-2xl overflow-hidden">
                    <Image
                        src={process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+article.thumbnailImage}
                        alt={article.thumbnailAlt || article.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="w-full flex flex-col pl-4">
                    <div>
                       <CategoryBadge value={category!}/>
                        <h3 className="text-[#161618] font-bold text-xl leading-6 tracking-tight laptop:text-xl laptop:leading-7">{title}</h3>
                    </div>
                    <p className="text-basic text-[#5F5F64] font-semibold mt-2 laptop:text-sm">{publishedAtForrmated}</p>
                </div>
            </a>
        </li>
    )
}

export default ArticleListItem