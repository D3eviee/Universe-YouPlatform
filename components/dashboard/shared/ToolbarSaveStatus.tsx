export const ToolbarSaveStatus = ({ isDraft, isSaved }: { isDraft: boolean; isSaved: boolean }) => (
  <span aria-live="polite" className="text-gray-400 text-basic mr-4 py-1">
    {isDraft ? "Not saved yet" : isSaved ? "Saved" : "Unsaved changes"}
  </span>
);