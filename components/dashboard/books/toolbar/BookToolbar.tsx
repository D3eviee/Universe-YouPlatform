import ToolbarAddBlocks from "../../toolbar/ToolbarAddBlocks"
import BookSaveStatus from "./BookSaveStatus"
import CreateBookButton from "./CreateBookButton"
import DeleteBookButton from "./DeleteBookButton"

const BookToolbar = () => {
  return (
    <div className="w-full flex flex-row justify-between mb-8">
        <DeleteBookButton/>
        <div className="absolute left-1/2 -translate-x-1/2">
          <ToolbarAddBlocks store="books"/>
        </div>
        
        <div className="flex flex-row items-center">
          <BookSaveStatus/>
          <CreateBookButton/>
        </div>
        
    </div>
  )
}

export default BookToolbar