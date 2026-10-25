export const isFile = (v: FormDataEntryValue | null): v is File => v instanceof File && v.size > 0;

export const slugify = (s: string) =>
    s
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

/** Reads a text field. Missing fields and file fields become undefined, so zod defaults apply. */
export const textField = (formData: FormData, key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : undefined;
};
