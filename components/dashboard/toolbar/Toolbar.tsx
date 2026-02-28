import ToolbarAddArticle from "./ToolbarAddArticle"
import ToolbarAddBlocks from "./ToolbarAddBlocks"
import ToolbarDeleteArticle from "./ToolbarDeleteArticle"

const Toolbar = () => {
  return (
    <div className="w-full flex flex-row justify-between pb-8">
        <ToolbarDeleteArticle/>
        <ToolbarAddBlocks/>
        <ToolbarAddArticle/>
    </div>
  )
}

export default Toolbar