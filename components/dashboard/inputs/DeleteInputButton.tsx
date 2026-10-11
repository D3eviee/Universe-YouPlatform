export const DeleteInputButton = ({onClick}:{onClick: () => void}) => {
  return (
    <button 
      onClick={onClick}
      
      className='text-red-500 px-2 py-0.5 text-sm bg-red-900/30 backdrop-blur-3xl rounded-lg hover:cursor-pointer hover:bg-red-900/50 active:scale-90 transition-all duration-75 ease-in'
    >
      Delete
    </button>
  )
}