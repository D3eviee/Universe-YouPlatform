import BookCard from "./BookCard"

const Books = () => {

  return (
    <section className="w-full flex flex-col p-8 bg-[#FFF]">
      <div className="tablet:w-173 me-auto ms-auto laptop:w-245">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Książki</h2>

        <div className="flex flex-col gap-8 tablet:flex-row ">
          <BookCard/>
          <BookCard/>
          <BookCard/>
        </div>

        <div className="flex justify-center mt-6 laptop:mt-12">
          <button className="text-[#161618] font-semibold bg-[#F5F5F5] mx-auto me-auto ms-auto px-6 py-2.5 rounded-2xl">View All</button>
        </div>
      </div>
    </section>
  )
}

export default Books