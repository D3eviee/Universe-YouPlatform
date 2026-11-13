'use client';
import useBookEditorStore from "@/store/BookEditorStore";
import { BookMenu } from "@/components/dashboard/books/BookMenu";
import { BookToolbar } from "@/components/dashboard/books/BookToolbar";
import { BookTextField } from "@/components/dashboard/books/BookTextField";
import { BookSettings } from "@/components/dashboard/books/BookSettings";
import { BlockListEditor } from "@/components/dashboard/editor/BlockListEditor";

export default function BooksDashboard() {
  const blocks = useBookEditorStore((s) => s.activeBook.blocks);
  const updateBlockData = useBookEditorStore((s) => s.updateBlockData);
  const deleteBlock = useBookEditorStore((s) => s.deleteBookContentBlock);

  return (
    <div className="w-full h-[calc(100dvh-55px)] flex flex-row">
      <BookMenu />
      <main className="flex-1 min-w-0 flex flex-row gap-3 border-l-[0.5px] border-l-black bg-primary-dark p-5">
        <section className="flex-1 min-w-0 h-full flex flex-col mx-2 overflow-hidden">
          <BookToolbar />
          <div className="w-full flex flex-col gap-5 overflow-y-auto pr-4">
            <BookTextField field="title" label="Book title" placeholder="Type book title here..." maxLength={200} />
            <BookTextField field="bookAuthor" label="Book author" placeholder="Who wrote the book?" maxLength={200} />
            <BookTextField field="subtitle" label="Subtitle" placeholder="A short subtitle" maxLength={500} />
            <BlockListEditor blocks={blocks} onUpdate={updateBlockData} onDelete={deleteBlock} />
          </div>
        </section>
        <BookSettings />
      </main>
    </div>
  );
}