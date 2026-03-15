import { BookThumbnail as BookThumbnailType } from "@/types"
import Image from "next/image"

const BookThumbnail = ({book}: {book:BookThumbnailType}) => {
    const {title, slug, bookAuthor, category, bookCover, bookCoverAlt } = book
    const img = process.env.NEXT_PUBLIC_AWS_S3_DOMAIN + bookCover

    return (
        <li role="listitem" className="active:scale-[0.99] transition-all duration-75">
            <a
            className="bg-white h-full flex flex-col overflow-clip rounded-3xl shadow-sm border border-gray-100 hover:cursor-pointer group"
            href={`books/${slug}`}
            >  
                <div className="relative w-full aspect-16/10 h-46 overflow-clip ">
                    <Image 
                        fill 
                        alt={bookCoverAlt} 
                        src={img} 
                        className="z-10 absolute w-full h-full object-contain transform"
                    />
                    <Image 
                        fill 
                        alt={bookCoverAlt} 
                        src={img} 
                        className="z-0 w-full h-full object-cover blur-xl" 
                    />
                </div>
    
                <div className="flex flex-col w-full p-6">
                    <p className="tile__category">{category?.toUpperCase()}</p>
                    <p className="tile__title">{title}</p>
                    <p className="tile__timestamp">{bookAuthor}</p>
                </div>
            </a>
        </li>
    )
}

export default BookThumbnail