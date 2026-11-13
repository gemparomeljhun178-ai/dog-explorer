export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="input"
      type="search"
      placeholder="Search breed (e.g. husky)..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
