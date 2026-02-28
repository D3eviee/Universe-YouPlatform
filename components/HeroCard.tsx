const HeroCard = () => {
  return (
    <div className="w-full h-full shrink-0 snap-center flex relative bg-[url('/hero-section-bg2.jpg')] bg-center bg-cover  rounded-3xl overflow-hidden p-4">
      <div className="z-10 w-full h-fit absolute bottom-4 flex flex-col gap-2 text-white">
        <p className="w-fit h-fit py-0.5 px-2 rounded-lg bg-[#4D6F00] text-xs flex justify-center items-center font-bold text-shadow-2xs">{"Środowisko".toUpperCase()}</p>
        <h2 className="font-semibold text-2xl">Article Title</h2>
        <p className="text-xs font-bold">18 listopada 2025 </p>
      </div>
      <div className="top-0 left-0 absolute bg-black/40 h-full w-full"/>
    </div>
  )
}

export default HeroCard

