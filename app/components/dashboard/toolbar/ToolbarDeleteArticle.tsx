const ToolbarDeleteArticle = () => {
  return (
    <button 
      aria-label="deletebutton"
      className="p-1 hover:bg-hover hover:cursor-pointer rounded-lg"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#1887FF" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
          <path d="M10 5a2 2 0 0 1 4 0"/>
          
          <line x1="4" y1="7" x2="20" y2="7"/>
          
          <path d="M6 7l1.2 12.5a2 2 0 0 0 2 1.5h5.6a2 2 0 0 0 2-1.5L18 7"/>
      </svg>
    </button>
  )
}

export default ToolbarDeleteArticle