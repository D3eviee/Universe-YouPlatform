import { BookThumbnail } from "@/types"
import { CategoryBadgeColor } from "./CategoryBadgeColor"

export const BookCard = ({book}: {book:BookThumbnail}) => {
  const {title, slug, bookAuthor, category, bookCover, bookCoverAlt } = book
  const img = process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+bookCover

  return (
    <a 
      className="group bg-white flex w-full flex-col overflow-hidden rounded-3xl shadow-sm border border-light-gray cursor-pointer h-76 tablet:w-83.25 laptop:w-75.75 transform-gpu isolate"
      href={`books/${slug}`}
    >  
    <div className="relative w-full h-90 overflow-hidden">
      <img alt={bookCoverAlt} src={img} className="z-10 absolute w-full h-full object-contain transform group-hover:scale-110 transition-all duration-300"/>
      <img alt={bookCoverAlt} src={img} className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110" />
    </div>
    
    <div className="w-full h-full relative flex flex-col  p-6">
      <CategoryBadgeColor value={category!} />
      <h3 className="text-dark-black leading-6.5 font-semibold text-xl tablet:text-2xl">{title}</h3>
      <p className="absolute bottom-6 text-light-black mt-2 font-medium text-sm tracking-wider">{bookAuthor}</p>
      </div>
    </a>
  )
}