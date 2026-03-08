'use client'
import BooksMenu from "@/components/dashboard/BooksMenu";
import BookTitleInput from "@/components/dashboard/inputs/BookTitleInput";
import BookAuthorInput from "@/components/dashboard/inputs/BookAuthorInput";
import BookContentInput from "@/components/dashboard/inputs/BookContentInput";
import BookCoverInput from "@/components/dashboard/inputs/BookCoverInput";
import BookSettings from "@/components/dashboard/settings/BookSettings";

export default function BooksDashboard() {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-row">
      <BooksMenu/>
      <main className="w-full flex flex-row gap-3 border-l-[0.5px] border-l-black  bg-primary-dark p-5">
        <section className="w-full flex flex-col mx-2 gap-5">
          <h1 className="text-white text-2xl font-semibold">Books Dashboard</h1>
          
          <div className="w-full flex flex-col gap-5 overflow-y-scroll pr-4">
            <BookTitleInput/>
            <BookAuthorInput/>
            <BookCoverInput/>
            <BookContentInput/>
          </div>
        </section>

        <BookSettings/>
      </main>
    </div>
  );
}