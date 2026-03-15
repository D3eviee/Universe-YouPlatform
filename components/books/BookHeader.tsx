import { CATEGORIES_LABELS } from "@/constants/constants"

type BookHeaderProps = {
    category:string, 
    title:string, 
    bookAuthor: string
}

const BookHeader = ({category, title, bookAuthor}:BookHeaderProps) => {
    const categoryFormatted = CATEGORIES_LABELS.find((o => o.value === category))

    return (
    <div className="w-full max-w-103 ms-auto me-auto tablet:max-w-none mt-8 tablet:mt-10 laptop:mt-13" >
        <div className="w-[86.5%] ms-auto me-auto mb-3 tablet:w-143 laptop:w-162">
            <p className="text-xs font-bold text-[#5B5B60] mb-6 text-center">{categoryFormatted?.label.toUpperCase()}</p>
        </div>

        <h2 className="text-lg font-medium leading-6.5 mt-2 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-2 text-center">{bookAuthor}</h2>
        <h1 className="text-[32px] font-bold text-[#161618] leading-9 w-[86.5%] ms-auto me-auto tablet:w-143 laptop:w-162 mb-8 text-center">{title}</h1>
    </div>
  )
}

export default BookHeader