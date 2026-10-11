import { CATEGORIES_LABELS } from "@/constants/constants"
import { format } from "date-fns"
import { SaveArticleButton } from "./SaveArticleButton"

type ArticleHeaderProps = {
    articleId: string,
    isSaved: boolean,
    slug: string,
    category:string, 
    title:string, 
    subtitle:string, 
    publishedAt: Date
    isLoggedIn: boolean
}

export const ArticleHeader = ({ articleId, isSaved, slug, category, title, subtitle, publishedAt, isLoggedIn } : ArticleHeaderProps) => {
    const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`
    const categoryFormatted = CATEGORIES_LABELS.find((o => o.value === category))
    return (
    <div className="px-2 tablet:px-0 w-90.5 tablet:w-xl laptop:w-163 mx-auto mt-10 laptop:mt-13">
        <div className="mx-auto flex flex-row items-center justify-between">
            <div className="flex flex-col gap-0.5">
                <p className="text-xxs font-bold text-dark-gray uppercase tracking-wider">{categoryFormatted?.label}</p>
                <p className="text-14 font-medium text-dark-gray">{publishedAtForrmated}</p> 
            </div>

            <SaveArticleButton 
                articleId={articleId} 
                initialIsSaved={isSaved} 
                slug={slug} 
                isLoggedIn={isLoggedIn}
            />
        </div>

        <h1 className="mx-auto my-4 tablet:my-6 text-3xl tablet:text-5xl tablet:leading-13 font-bold text-dark-black">{title}</h1>
        <h2 className="mx-auto text-xl text-dark-black tablet:font-medium tracking-[0.015em] leading-7  mb-8 tablet:mb-12">{subtitle}</h2>
    </div>
  )
}