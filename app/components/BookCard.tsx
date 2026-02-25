const BookCard = () => {
  return (
    <a 
      className="bg-white h-full flex flex-col overflow-clip rounded-3xl shadow-sm border border-gray-100 hover:cursor-pointer group"
      href="/"
    >  
    <div className="relative w-full aspect-16/10 h-46 overflow-clip ">
      <img  alt="alt" src={"/book2.jpg"} className="z-10 absolute w-full h-full object-contain transform"/>
      <img  alt="alt" src={"/book2.jpg"} className="z-40 w-full h-full object-cover blur-xl" />
    </div>
    
    <div className="flex flex-col w-full p-6">
        <p className="text-xs black">SCIENCE</p>
        <h3 className="text-[#111119] h-full text-xl font-semibold line-clamp-2 leading-tight mt-2">Sticky: The Secret Science of Surfaces</h3>
        <p className="text-[#111119] text-sm font-medium mt-2">Laurie Winkless</p>
      </div>
  </a>
  )
}

export default BookCard

