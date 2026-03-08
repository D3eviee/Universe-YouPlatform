import { CATEGORIES_LABELS } from "@/constants/constants"
import { format } from "date-fns"

type ArticleHeaderProps = {
    category:string, 
    title:string, 
    subtitle:string, 
    publishedAt: Date
}

const ArticleHeader = ({category, title, subtitle, publishedAt}:ArticleHeaderProps) => {
    const publishedAtForrmated = `${format(publishedAt, "MMMM")} ${format(publishedAt, "d")}, ${format(publishedAt, "y")}`
    const categoryFormatted = CATEGORIES_LABELS.find((o => o.value === category))
    return (
    <div className="w-full max-w-103 ms-auto me-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13" >
        <div className="w-[86.5%] ms-auto me-auto mb-3 tablet:w-143 laptop:w-162">
            <p className="text-xs font-bold text-[#5B5B60] mb-1">{categoryFormatted?.label.toUpperCase()}</p>
            <p className="text-sm font-medium text-[#535358]">{publishedAtForrmated}</p>
        </div>

        <h1 className="text-[32px] font-bold text-[#161618] leading-9 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-4">{title}</h1>
        <h2 className="text-lg font-medium leading-6.5 mt-4 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-6">{subtitle}</h2>
    </div>
  )
}

export default ArticleHeader