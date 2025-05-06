export default function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 transition"
      />
    </div>
  );
}
