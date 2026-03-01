import ToolbarAddArticle from "./ToolbarAddArticle"
import ToolbarAddBlocks from "./ToolbarAddBlocks"
import ToolbarDeleteArticle from "./ToolbarDeleteArticle"
import ToolbarSaveIndicator from "./ToolbarSaveIndicator"

const Toolbar = () => {
  return (
    <div className="w-full flex flex-row justify-between mb-8">
        <ToolbarDeleteArticle/>
        <div className="border absolute left-1/2 -translate-x-1/2">
          <ToolbarAddBlocks/>
        </div>
        
        <div className="flex flex-row items-center">
          <ToolbarSaveIndicator/>
          <ToolbarAddArticle/>
        </div>
        
    </div>
  )
}

export default Toolbar