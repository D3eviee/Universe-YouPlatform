import ArticleListItem from "@/app/components/articles/ArticleListItem";

export default function Home() {
  return (
    <section className="h-full w-full pt-8 pb-10">
      <div className="mx-auto w-[87.5%] max-w-91.5">
        <h2 className="text-[#161618] font-bold text-xl mb-4">February 2026</h2>

        <ul role="list" className="">
        <ArticleListItem/>
        <ArticleListItem/>
        <ArticleListItem/>
        <ArticleListItem/>
        </ul>
      </div>
    </section>
  );
}


      // <div className="sticky top-0 bg-[#F2F2F5] text-[#5B5B60] text-basic font-bold px-8 py-6">
      //   <p>Filter</p>
      // </div>
