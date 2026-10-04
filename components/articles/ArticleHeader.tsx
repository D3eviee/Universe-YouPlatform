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
    <div className="w-full max-w-103 ms-auto me-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13" >
        <div className="w-[86.5%] ms-auto me-auto flex flex-row items-center justify-between mb-10 tablet:w-143 laptop:w-162">
            <div className="flex flex-col ">
                <p className="text-sm font-bold text-[#72726F] mb-1">{categoryFormatted?.label.toUpperCase()}</p>
                <p className="text-sm font-medium text-[#72726F]">{publishedAtForrmated}</p> 
            </div>

            <SaveArticleButton 
                articleId={articleId} 
                initialIsSaved={isSaved} 
                slug={slug} 
                isLoggedIn={isLoggedIn}
            />
        </div>

        <h1 className="text-5xl font-bold text-[#121212] leading-9 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-6">{title}</h1>
        <h2 className="text-lg text-[#1A1A1A] leading-6.5 mt-4 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-6">{subtitle}</h2>
    </div>
  )
}