'use client';
import { format } from "date-fns";
import type { Book } from "@/server/schema";
import useBookEditorStore from "@/store/BookEditorStore";
import { MenuCategoryTag } from "../shared/MenuCategoryTag";

export const BookMenuItem = ({ book, onSelect }: { book: Book; onSelect: () => void }) => {
    // Each item only re-renders when *its own* active state or live values change
    const isActive = useBookEditorStore((s) => s.activeBook.id === book.id);
    const liveTitle = useBookEditorStore((s) => (s.activeBook.id === book.id ? s.activeBook.title : null));
    const liveAuthor = useBookEditorStore((s) => (s.activeBook.id === book.id ? s.activeBook.bookAuthor : null));
    const liveCategory = useBookEditorStore((s) => (s.activeBook.id === book.id ? s.activeBook.category : null));
    
    const title = (isActive ? liveTitle : book.title) || "Untitled book";
    const author = (isActive ? liveAuthor : book.bookAuthor) || "No author yet";
    const category = isActive ? liveCategory : book.category;
    
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={isActive || undefined}
            className={`w-full flex text-left flex-col gap-2 px-7 py-3 rounded-xl sidebar-item-hover ${isActive ? "bg-focus" : "bg-transparent"}`}
        >
            <span className="sidebar-item-header">{title}</span>
            <span className="sidebar-item-details leading-4">{author}</span>
            <span className="flex flex-row gap-2 mt-0.5">
                <span className="sidebar-item-details px-1 bg-gray-600 rounded-md">{format(book.publishedAt, "d MMM yyyy")}</span>
                <MenuCategoryTag value={category} />
            </span>
        </button>
    );
};