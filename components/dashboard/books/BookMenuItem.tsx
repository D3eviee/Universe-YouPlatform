'use client'
import { Book } from "@/server/schema";
import useBookEditorStore from "@/store/BookEditorStore";

const BookMenuItem = ({book}:{book:Book}) => {
    const { setActiveBook, activeBook } = useBookEditorStore()
    if(!activeBook) return 
    const {id, title, subtitle, publishedAt, category} = activeBook
    const isActive = activeBook.id === book.id

    const manageDisplay = (activeLabel:string, disabledLabel:string, fallback:string) => {
        let label:string
        if(isActive){
            if(activeLabel == "") label = fallback
            else label = activeLabel
        }
        else  {
            if(disabledLabel == "") label = fallback
            else label = disabledLabel
        }
        return label
    }

  return (
    <div  
        onClick={() => { setActiveBook(book)}} 
        className={`flex text-left flex-col gap-2 px-7 py-3 rounded-xl sidebar-item-hover ${id === book.id ? "bg-focus" : "bg-transparent"}`}
    >
        <h2 className="sidebar-item-header">{manageDisplay(title, book.title, "New article")}</h2>
        <p className="sidebar-item-details leading-4">{manageDisplay(subtitle, book.subtitle, "No content provided")}</p>
        <div className="flex flex-row gap-2 mt-0.5">
            <p className="sidebar-item-details px-1  bg-gray-600 rounded-md">{publishedAt ? book.publishedAt.toLocaleDateString('en-EN') : book.publishedAt.toLocaleDateString('en-EN')}</p>
            <p className="sidebar-item-details px-1 bg-[#5A0C9F] rounded-md">{isActive ? category : book.category}</p>
        </div>
    </div>
  )
}

export default BookMenuItem