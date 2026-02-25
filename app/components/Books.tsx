import BookCard from "./BookCard"

const Books = () => {

  return (
    <section className="w-full flex flex-col p-8 bg-[#FFF]">
      <h2 className="text-2xl font-bold tracking-tight mb-8">Książki</h2>
      <div className="flex flex-col gap-8">
        <BookCard/>
        <BookCard/>
      </div>

      <button className="text-[#161618] font-semibold bg-[#F5F5F5] h-fit w-fit mx-auto px-6 py-2.5 rounded-2xl mt-6">
        View All
      </button>
    </section>
  )
}

export default Books