import Image from "next/image"

type BookHeaderImageProps = {
    bookCover:string, 
    bookCoverAlt:string, 
    bookCoverAnnotation:string, 
}

const BookHeaderImage = ({bookCover, bookCoverAlt, bookCoverAnnotation}:BookHeaderImageProps) => {
    const url = `${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${bookCover}`;

    return (
        <div className="w-full max-w-103 ms-auto me-auto tablet:max-w-none tablet:w-172 laptop:w-245"> 
            <div className="relative h-90 w-65 mx-auto tablet:w-65 laptop:w-80 laptop:h-110">
                <Image src={url} alt={bookCoverAlt} fill className="rounded-2xl overflow-hidden"/>
            </div>
        </div>
    )
}

export default BookHeaderImage