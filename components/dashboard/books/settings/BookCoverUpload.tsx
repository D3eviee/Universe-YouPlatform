'use client'
import useBookEditorStore from "@/store/BookEditorStore"
import { ChangeEvent, useEffect, useState } from "react"

const BookCoverUpload = () => {
    const updateBookField = useBookEditorStore(store => store.updateBookField)
    const {bookCover, bookCoverAlt, bookCoverAnnotation} = useBookEditorStore(store => store.activeBook)
    const [ blob, setBlob ] = useState<string | null>(null)

    useEffect(() => {
        if (bookCover && bookCover != "") setBlob(`${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}${bookCover}`)
        else setBlob(null)
    }, [bookCover])

    useEffect(() => {
        return () => {
            if (blob && blob.startsWith('blob:')) URL.revokeObjectURL(blob)
        }
    }, [blob])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target || !e.target.files) return 
        const imageFile = e.target.files[0]
        const imageBlob = URL.createObjectURL(imageFile)
        updateBookField("bookCover", bookCover)
        setBlob(imageBlob)
    }

  return (
    <div className="w-full flex flex-col gap-2 px-2">
        <p className="text-gray-400 font-light tracking-wider text-xs uppercase">BOOK COVER IMAGE</p>
        <div className="w-3/5 mb-3">
            {!blob ?
                <label htmlFor="fileInput" className="w-full h-52 rounded-2xl flex items-center justify-center bg-hover cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"     strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
                </label>
                :
                <label htmlFor="fileInput" className="h-60 relative w-full rounded-2xl overflow-hidden flex justify-center cursor-pointer">
                    <img src={blob} alt="Podgląd uploadu" className="w-full object-cover"/>
                </label>
            }
            <input id="fileInput" type="file" hidden onChange={handleChange} accept="image/*"/>
        </div>

        <div className="flex flex-col gap-0.5">
            <label className="text-gray-200 font-base tracking-wider text-xs" htmlFor="coverAlt">Cover alt</label>
            <input 
                id="coverAlt" 
                type="text"  
                className="border rounded-md mt-1 border-focus outline-0 px-2 py-0.5 text-white text-sm"
                value={bookCoverAlt}
                onChange={(e) => updateBookField("bookCoverAlt", e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-0.5">
            <label className="text-gray-200 font-base tracking-wider text-xs" htmlFor="bookCoverAnnotation">Cover source</label>
            <input 
                id="bookCoverAnnotation" 
                type="text" 
                className="border rounded-md mt-1 border-focus outline-0 px-2 py-0.5 text-white text-sm"
                value={bookCoverAnnotation}
                onChange={(e) => updateBookField("bookCoverAnnotation", e.target.value)}
            />
        </div>
    </div>
  )
}

export default BookCoverUpload