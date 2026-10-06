const CATEGORIES_LABELS = [
    {label: "Science & Tech", value: "science-and-tech", color: "bg-aqua-light"}, 
    {label: "News & Politics", value: "news-and-politics", color: "#DC2626"}, 
    {label: "Entertainment", value: "entertainment", color: "bg-aqua-dark"}, 
    {label: "Money & Business", value: "money-and-business", color: "#10B981"}, 
    {label: "Sport", value: "sport", color: "#F97316"}, 
    {label: "Music", value: "music", color: "#EC4899"}, 
    {label: "History", value: "history", color: "#B45309"}, 
    {label: "Health", value: "health", color: "#14B8A6"}, 
    {label: "Cars", value: "cars", color: "#64748B"}, 
    {label: "Coding", value: "coding", color: "#1E293B"}  
]

export const CategoryBadgeColor = ({ value}:{ value:string }) => {
  const category = CATEGORIES_LABELS.find((category) => category.value === value)
  if (!category) return null;

  return (
    <p 
      className={`px-2 py-0.5 rounded-md w-fit h-fit flex justify-center items-center text-xs mb-3 font-stretch-110% font-bold leading-none text-white ${category.color}`}
    >
      {category.label.toUpperCase()}
    </p>
  )
}