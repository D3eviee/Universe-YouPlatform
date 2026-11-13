export const CATEGORIES = [
  { value: "science-and-tech",   label: "Science & Tech",    badge: "bg-blue-500" },
  { value: "news-and-politics",  label: "News & Politics",   badge: "bg-red-600" },
  { value: "entertainment",      label: "Entertainment",     badge: "bg-violet-500" },
  { value: "money-and-business", label: "Money & Business",  badge: "bg-emerald-500" },
  { value: "sport",              label: "Sport",             badge: "bg-orange-500" },
  { value: "music",              label: "Music",             badge: "bg-pink-500" },
  { value: "history",            label: "History",           badge: "bg-amber-700" },
  { value: "health",             label: "Health",            badge: "bg-teal-500" },
  { value: "cars",               label: "Cars",              badge: "bg-slate-500" },
  { value: "coding",             label: "Coding",            badge: "bg-slate-800" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];
export const CATEGORY_VALUES = CATEGORIES.map((c) => c.value) as [Category, ...Category[]];
export const getCategory = (value: string | null) => CATEGORIES.find((c) => c.value === value);

export const CATEGORY_OPTIONS = CATEGORIES.map(({ value, label }) => ({ value, label }));