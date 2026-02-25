const Latest = () => {

  return (
    <section className="w-full flex flex-col p-8 bg-[#F2F2F5]">
      <h2 className="text-2xl font-bold tracking-tight mb-8">Więcej z Apple Newsroom</h2>
      <div className="flex flex-col divide-y gap-8 divide-[#C5C5C5]">
        <div className="w-full flex flex-col gap-8 pb-8">
          <div className="w-full flex flex-row gap-4 hover:cursor-pointer">
            <div className="w-27 h-27 rounded-2xl bg-[url('/hero-section-bg2.jpg')] bg-cover shrink-0"/>
            <div className="w-full flex flex-col gap-2 pt-1">
              <p className="text-xs text-[#5F5F64] font-semibold">INFORMACJA PRASOWA</p>
              <h3 className="text-[#161618] font-bold text-xl leading-6 tracking-tight">Usługa Apple Fitness+ dostępna w Polsce od 15 grudnia</h3>
              <p className="text-basic text-[#5F5F64] font-semibold">13 stycznia 2026</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8 pb-8">
          <div className="w-full flex flex-row gap-4">
            <div className="w-27 h-27 rounded-2xl bg-[url('/hero-section-bg2.jpg')] bg-cover shrink-0"/>
            <div className="w-full flex flex-col gap-2 pt-1">
              <p className="text-xs text-[#5F5F64] font-semibold">NAJNOWSZE</p>
              <h3 className="text-[#161618] font-bold text-xl leading-6 tracking-tight">Apple Manufacturing Academy rozpoczyna zajęcia wirtualne</h3>
              <p className="text-basic text-[#5F5F64] font-semibold">2 stycznia 2026</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8 pb-8">
          <div className="w-full flex flex-row gap-4">
            <div className="w-27 h-27 rounded-2xl bg-[url('/hero-section-bg2.jpg')] bg-cover shrink-0"/>
            <div className="w-full flex flex-col gap-2 pt-1">
              <p className="text-xs text-[#5F5F64] font-semibold">NAJNOWSZE</p>
              <h3 className="text-[#161618] font-bold text-xl leading-6 tracking-tight">Apple ogłasza zmiany w kadrze kierowniczej</h3>
              <p className="text-basic text-[#5F5F64] font-semibold">02 stycznia 2026</p>
            </div>
          </div>
        </div>
      </div>

      <button className="text-[#161618] font-semibold bg-[#E2E2E9] h-fit w-fit mx-auto px-6 py-2.5 rounded-2xl mt-4">
        Wyświetl wszystkie
      </button>
    </section>
  )
}

export default Latest