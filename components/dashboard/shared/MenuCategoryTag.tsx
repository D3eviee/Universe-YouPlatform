import { getCategory } from "@/lib/constants/categories";

export const MenuCategoryTag = ({ value }: { value: string | null }) => {
  const category = getCategory(value);
  if (!category) return null;

  return (
    <span className={`sidebar-item-details px-1 rounded-md uppercase text-white ${category.badge}`}>
      {category.label}
    </span>
  );
};