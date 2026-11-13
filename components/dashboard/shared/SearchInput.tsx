type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchInput = ({ value, onChange, placeholder = "Search..." }: SearchInputProps) => (
  <input
    type="search"
    aria-label={placeholder}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-input mb-3 px-2 py-1 text-white rounded-lg text-sm w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-focus"
  />
);