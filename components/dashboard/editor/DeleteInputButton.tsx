export const DeleteInputButton = ({ onClick, label = "Delete block" }: { onClick: () => void; label?: string }) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      aria-label={label}
      className="text-red-500 px-2 py-0.5 text-sm bg-red-900/30 backdrop-blur-3xl rounded-lg cursor-pointer hover:bg-red-900/50 active:scale-90 transition-[transform,background-color] duration-75 ease-in focus-visible:ring-2 focus-visible:ring-red-400"
    >
      Delete
    </button>
  )
}