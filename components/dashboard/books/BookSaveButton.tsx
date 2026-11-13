'use client'
import { useIsSavedBook } from "@/hooks/useIsSavedBook"
import useBookEditorStore, { type EditorBook } from "@/store/BookEditorStore"
import type { EditorBlock } from "@/lib/schemas/blocks"
import { SaveError } from "@/lib/api-errors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Oval } from "react-loader-spinner"
import { uploadEditorImages } from "@/lib/upload-editor-images"
import { Book } from "@/server/schema"

// Readable names for the fields the server may complain about
const FIELD_NAMES: Record<string, string> = {
  title: "Title",
  bookAuthor: "Book author",
  category: "Category",
  status: "Status",
  subtitle: "Subtitle",
  publishedAt: "Publish date",
  images: "Images",
};

/** Uploads new images straight to S3, then saves the book as JSON. */
async function saveBook(book: EditorBook, method: "POST" | "PUT"): Promise<Book> {
    // 1) UPLOAD (Files in the editor state → S3 keys)
    const { cover, blocks } = await uploadEditorImages("books", book.id, { 
        cover: book.bookCover, 
        blocks: book.blocks 
    });

    // 2) SAVE
    const res = await fetch("/api/dashboard/books", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            bookAuthor: book.bookAuthor,
            category: book.category,
            status: book.status,
            bookCover: cover,
            bookCoverAlt: book.bookCoverAlt,
            bookCoverAnnotation: book.bookCoverAnnotation,
            publishedAt: book.publishedAt.toISOString(),
            blocks,
        }),
    })

    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new SaveError(json.error ?? "Couldn't save the book", json.issues);
    return { ...json, publishedAt: new Date(json.publishedAt), createdAt: new Date(json.createdAt) };
}

export const BookSaveButton = () => {
    const activeBook = useBookEditorStore(store => store.activeBook)
    const setActiveBook = useBookEditorStore(store => store.setActiveBook)
    const queryClient = useQueryClient()
    const isSaved = useIsSavedBook()

    const saveMutation = useMutation({
        mutationFn: ({ book, method }: { book: EditorBook, method: "POST" | "PUT" }) => saveBook(book, method),
        onSuccess: (saved) => {
            // The saved book has S3 keys instead of Files, so a later save won't upload again
            setActiveBook({ ...saved, publishedAt: new Date(saved.publishedAt), createdAt: new Date(saved.createdAt) })
            queryClient.invalidateQueries({ queryKey: ["books"] })
        },
        onError: (error) => {
            // TODO: show these in the UI. `issues` says which field is wrong.
            console.error(error.message, error instanceof SaveError ? error.issues : "")
        },
    })

    const { mutate, isPending, error, reset } = useMutation({
        mutationFn: (book: EditorBook) => saveBook(book, book.isLocalDraft ? "POST" : "PUT"),
        onSuccess: (saved) => {
            // The saved book has S3 keys instead of Files, so a later save won't upload again
            setActiveBook(saved);
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
    });

    const issues = error instanceof SaveError ? error.issues : [];

    return (
        <div className="flex flex-col gap-3">
            {error && (
                <div role="alert" className="rounded-xl bg-red-900/30 px-3 py-2 text-sm text-red-300">
                    <p className="font-medium">{issues.length ? "Fix these before saving:" : error.message}</p>
                    {issues.length > 0 && (
                        <ul className="mt-1 list-disc pl-5">
                            {issues.map((issue, i) => (
                                <li key={i}>{FIELD_NAMES[issue.path.split(".")[0]] ?? "Content"}: {issue.message}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            
            <button
                type="button"
                onClick={() => {
                    reset();
                    mutate(activeBook);
                }}
                disabled={isSaved || isPending}
                className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5} /> : "Save"}
            </button>
        </div>
    )
}