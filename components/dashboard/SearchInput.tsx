
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search..." }:SearchInputProps) => {
  return (
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full focus:outline-none"
    />
  )
}

export default SearchInput
