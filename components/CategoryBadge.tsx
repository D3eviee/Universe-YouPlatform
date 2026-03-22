const CATEGORIES_LABELS = [
    {label: "Science & Tech", value: "science-and-tech", color: "#3B82F6"}, 
    {label: "News & Politics", value: "news-and-politics", color: "#DC2626"}, 
    {label: "Entertainment", value: "entertainment", color: "#8B5CF6"}, 
    {label: "Money & Business", value: "money-and-business", color: "#10B981"}, 
    {label: "Sport", value: "sport", color: "#F97316"}, 
    {label: "Music", value: "music", color: "#EC4899"}, 
    {label: "History", value: "history", color: "#B45309"}, 
    {label: "Health", value: "health", color: "#14B8A6"}, 
    {label: "Cars", value: "cars", color: "#64748B"}, 
    {label: "Coding", value: "coding", color: "#1E293B"}  
]

const CategoryBadge = ({ value }:{ value:string }) => {
  const category = CATEGORIES_LABELS.find((category) => category.value === value)
  if (!category) return null;

  return (
    <p 
      className="thumbnail-category text-light-gray "
    >
      {category.label.toUpperCase()}
    </p>
  )
}

export default CategoryBadge