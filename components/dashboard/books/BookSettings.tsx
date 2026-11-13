'use client';
import useBookEditorStore from "@/store/BookEditorStore";
import { CATEGORY_OPTIONS } from "@/lib/constants/categories";
import { ChipSelect } from "../shared/ChipSelect";
import { TimeSelect } from "../shared/TimeSelect";
import { SettingsContainer } from "../shared/SettingsContainer";
import { BookCoverUpload } from "./BookCoverUpload";
import { STATUS_OPTIONS } from "@/lib/constants/constants";
import { BookSaveButton } from "./BookSaveButton";

export const BookSettings = () => {
    const category = useBookEditorStore((s) => s.activeBook.category);
    const status = useBookEditorStore((s) => s.activeBook.status);
    const publishedAt = useBookEditorStore((s) => s.activeBook.publishedAt);
    const updateBookField = useBookEditorStore((s) => s.updateBookField);
    
    return (
        <SettingsContainer>
            <div className="flex flex-col gap-10 overflow-y-auto scrollbar__none">
                <BookCoverUpload />
                <ChipSelect label="Category" options={CATEGORY_OPTIONS} selected={category} onChange={(v) => updateBookField("category", v)} />
                <ChipSelect label="Status" options={STATUS_OPTIONS} selected={status} onChange={(v) => updateBookField("status", v)} />
                <TimeSelect selectedDate={publishedAt} onChange={(d) => updateBookField("publishedAt", d)} />    
            </div>
            <BookSaveButton />
        </SettingsContainer>
    );
};