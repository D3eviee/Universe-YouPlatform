import { getCategory } from "@/lib/constants/categories";

export const CategoryBadge = ({ value, variant = "plain" }: { value: string | null; variant?: "plain" | "color" }) => {
  const category = getCategory(value);
  if (!category) return null;

  return variant === "color" ? (
    <p className={`px-2 py-0.5 rounded-md w-fit text-xs mb-3 font-stretch-110% font-bold leading-none uppercase text-white ${category.badge}`}>
      {category.label}
    </p>
  ) : (
    <p className="mb-2 text-xs tracking-widest font-semibold font-stretch-105% uppercase text-dark-gray">
      {category.label}
    </p>
  );
};