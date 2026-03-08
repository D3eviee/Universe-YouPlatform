import QuoteToolbarAdd from "./QuoteToolbarAdd"
import QuoteToolbarDelete from "./QuoteToolbarDelete"
import QuoteToolbarSaveIndicator from "./QuoteToolbarSaveIndicator"

const QuoteToolbar = () => {
  return (
    <div className="w-full flex flex-row justify-between mb-8">
      <QuoteToolbarDelete/>
      <div className="flex flex-row items-center">
        <QuoteToolbarSaveIndicator/>
        <QuoteToolbarAdd/>
      </div>  
    </div>
  )
}

export default QuoteToolbar