import { SaveError } from "@/lib/api-errors";

const FIELD_NAMES: Record<string, string> = {
  title: "Title",
  subtitle: "Subtitle",
  bookAuthor: "Book author",
  category: "Category",
  status: "Status",
  priority: "Priority",
  publishedAt: "Publish date",
  images: "Images",
};

export const SaveErrors = ({ error }: { error: Error | null }) => {
    if (!error) return null;
    const issues = error instanceof SaveError ? error.issues : [];
    
    return (
        <div role="alert" className="rounded-xl bg-red-900/30 px-3 py-2 text-sm text-red-300">
            <p className="font-medium">{issues.length ? "Fix these before saving:" : error.message}</p>
            {issues.length > 0 && (
                <ul className="mt-1 list-disc pl-5">
                    {issues.map((issue, i) => <li key={i}>{FIELD_NAMES[issue.path.split(".")[0]] ?? "Content"}: {issue.message}</li> )}
                </ul>
            )}
        </div>
    );
};