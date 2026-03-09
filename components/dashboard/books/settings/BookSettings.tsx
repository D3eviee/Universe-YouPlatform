'use client'
import useBookEditorStore from "@/store/BookEditorStore"
import CategorySelect from "../../CategorySelect"
import TimeSelect from "../../TimeSelect"
import StatusSelect from "../../StatusSelect"
import SettingsContainer from "../../SettingsContainer"
import BookSentButton from "./BookSentButton"
import BookCoverUpload from "./BookCoverUpload"

const BookSettings = () => {
    const activeBook = useBookEditorStore(store => store.activeBook)
    const updateBookField = useBookEditorStore(store => store.updateBookField)

    return (
        <SettingsContainer>
            <div className="flex flex-col gap-10 overflow-scroll scrollbar__none">
            <BookCoverUpload/>
                <CategorySelect 
                    selectedCategory={activeBook?.category} 
                    onChange={(newCategory) => updateBookField("category", newCategory)} 
                />

                <StatusSelect
                    onChange={(newStatus) => updateBookField("status", newStatus)} 
                    selectedStatus={activeBook.status}
                />

                <TimeSelect
                    onChange={(newDate) => updateBookField("publishedAt", newDate)}
                    selectedDate={activeBook?.publishedAt}
                />
            </div>

            <BookSentButton/>
        </SettingsContainer>
    )
}

export default BookSettings