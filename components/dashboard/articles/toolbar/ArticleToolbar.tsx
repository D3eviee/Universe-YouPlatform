import ToolbarAddBlocks from "../../toolbar/ToolbarAddBlocks"
import ArticleDeleteButton from "./ArticleDeleteButton"
import ArticleSaveStatus from "./ArticleSaveStatus"
import CreateArticleButton from "./CreateArticleButton"

const ArticleToolbar = () => {
  return (
    <div className="w-full flex flex-row justify-between mb-8">
        <ArticleDeleteButton/>
        <div className="absolute left-1/2 -translate-x-1/2">
          <ToolbarAddBlocks store="articles"/>
        </div>
        
        <div className="flex flex-row items-center">
          <ArticleSaveStatus/>
          <CreateArticleButton/>
        </div>
        
    </div>
  )
}

export default ArticleToolbar