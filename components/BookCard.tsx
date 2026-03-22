import { BookThumbnail } from "@/types"
import CategoryBadgeColor from "./CategoryBadgeColor"

const BookCard = ({book}: {book:BookThumbnail}) => {
  const {title, slug, bookAuthor, category, bookCover, bookCoverAlt } = book
  const img = process.env.NEXT_PUBLIC_AWS_S3_DOMAIN+bookCover

  return (
    <a 
      className="bg-white flex w-full flex-col overflow-clip  rounded-3xl shadow-sm border border-gray-100 hover:cursor-pointer h-88 tablet:w-83.25 laptop:w-75.75"
      href={`books/${slug}`}
    >  
    <div className="relative w-full aspect-16/10 h-46 overflow-clip">
      <img alt={bookCoverAlt} src={img} className="z-10 absolute w-full h-full object-contain transform"/>
      <img alt={bookCoverAlt} src={img} className="z-40 w-full h-full object-cover blur-xl" />
    </div>
    
    <div className="h-full relative flex flex-col w-full p-6">
      <CategoryBadgeColor value={category!} styles="hero-category rounded-md mb-3"/>
      <h3 className="thumbnail-title">{title}</h3>
      <p className="absolute bottom-6 thumbnail-info">{bookAuthor}</p>
      </div>
    </a>
  )
}

export default BookCard

