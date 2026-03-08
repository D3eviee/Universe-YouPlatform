'use client'
import useBookEditorStore from "@/store/BookEditorStore"
import CategorySelect from "./CategorySelect"
import TimeSelect from "./TimeSelect"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Oval } from "react-loader-spinner"

const BookSettings = () => {
    const activeBook = useBookEditorStore(store => store.activeBook)
    const updateBookField = useBookEditorStore(store => store.updateBookField)
    const queryClient = useQueryClient()

    const [selectedStatus, setSelectedStatus] = useState(activeBook?.status || "public")

    const saveMutation = useMutation({
        mutationFn: async ({ method, formData }: { method: string, formData: FormData }) => {
            const response = await fetch("/api/dashboard/books", {            
                method: method, 
                body: formData
            });
            if (!response.ok) throw new Error("Error saving book");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
        onError: (error) => {
            console.error("Error saving:", error);
        }
    });

    const handleSave = async () => {
        if (!activeBook) return;
        const { title, category, bookCover, bookCoverAlt, bookAuthor, content, id, authorId, publishedAt } = activeBook;

        if(!title || !category || !authorId || !publishedAt) {
            console.warn("Missing required fields!");
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("authorId", authorId.toString());
        formData.append("title", title);
        formData.append("category", category);
        formData.append("bookAuthor", typeof bookAuthor === 'object' && bookAuthor !== null && 'name' in bookAuthor ? (bookAuthor as any).name : "");
        formData.append("author", "admin");
        formData.append("content", typeof content === 'object' && content !== null && 'text' in content ? (content as any).text : "");
        formData.append("bookCoverAlt", bookCoverAlt || "");
        formData.append("status", selectedStatus);
        formData.append("publishedAt", publishedAt.toISOString());

        if (bookCover && typeof bookCover === 'object' && 'name' in bookCover) {
            formData.append("bookCoverFile", bookCover);
        }

        const isNewDraft = (activeBook as any).isLocalDraft === true;
        const httpMethod = isNewDraft ? "POST" : "PUT";
        saveMutation.mutate({ method: httpMethod, formData });
    };

    return (
        <section className="w-1/3 flex flex-col gap-10 bg-secondary-dark p-5 rounded-3xl">
            <div className="flex flex-col gap-10 overflow-scroll scrollbar__none">
                <CategorySelect 
                    selectedCategory={activeBook?.category} 
                    onChange={(newCategory) => updateBookField("category", newCategory)} 
                />

                <div className="flex flex-col gap-2 px-2">
                    <p className="text-gray-400 font-light tracking-wider text-xs uppercase">Status</p>
                    <div className="flex flex-row gap-2">
                        {["draft", "public"].map(status => (
                            <button 
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`border-[0.5px] border-focus px-2 py-0.5 text-sm text-white rounded-lg hover:cursor-pointer transition-colors backdrop-blur-md
                                    ${selectedStatus === status ? "bg-blue-600/60 shadow-sm border-transparent" : "bg-transparent"}`
                                }
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <TimeSelect
                    onChange={(newDate) => updateBookField("publishedAt", newDate)}
                    selectedDate={activeBook?.publishedAt}
                />
            </div>

            <button 
                onClick={handleSave}
                type="button"
                disabled={saveMutation.isPending} 
                className="py-3 px-8 w-full rounded-xl bg-focus text-white flex items-center justify-center disabled:bg-[#333] disabled:text-gray-500 shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
                {saveMutation.isPending ? <Oval width={18} height={18} color="#FFF" secondaryColor="#555" strokeWidth={5}/> : "Save Book"}
            </button>
        </section>
    )
}

export default BookSettings