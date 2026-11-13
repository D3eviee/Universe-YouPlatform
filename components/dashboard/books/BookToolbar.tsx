'use client';
import useBookEditorStore from "@/store/BookEditorStore";
import { useIsSavedBook } from "@/hooks/useIsSavedBook";
import { ToolbarAddBlocks } from "../toolbar/ToolbarAddBlocks";
import { ToolbarDeleteContentButton } from "../shared/ToolbarDeleteContentButton";
import { ToolbarSaveStatus } from "../shared/ToolbarSaveStatus";
import { ToolbarNewContentButton } from "../shared/ToolbarNewContentButton";

export const BookToolbar = () => {
  const bookId = useBookEditorStore((s) => s.activeBook.id);
  const title = useBookEditorStore((s) => s.activeBook.title);
  const isDraft = useBookEditorStore((s) => !!s.activeBook.isLocalDraft);
  const addBlock = useBookEditorStore((s) => s.addBookContentBlock);
  const startNewBook = useBookEditorStore((s) => s.startNewBook);
  const isSaved = useIsSavedBook();

  return (
    <div className="relative w-full flex flex-row justify-between items-center mb-8">
      <ToolbarDeleteContentButton
        endpoint="/api/dashboard/books"
        queryKey="books"
        noun="book"
        id={bookId}
        title={title}
        isDraft={isDraft}
        onDeleted={startNewBook}
      />

      <div className="absolute left-1/2 -translate-x-1/2">
        <ToolbarAddBlocks onAdd={addBlock} />
      </div>

      <div className="flex flex-row items-center">
        <ToolbarSaveStatus isDraft={isDraft} isSaved={isSaved} />
        <ToolbarNewContentButton noun="book" isSaved={isSaved} onCreate={startNewBook} />
      </div>
    </div>
  );
};