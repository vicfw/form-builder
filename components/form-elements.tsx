import { useFormElementsStore } from "@/lib/store/form-elements-store";

export function SingleLineInput() {
  const { properties } = useFormElementsStore();

  if (!properties || properties.type !== "single-line") return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: properties.width }}>
      <label className="text-sm font-medium">
        {properties.label}
        {properties.isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        placeholder={properties.placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function MultilineInput() {
  const { properties } = useFormElementsStore();

  if (!properties || properties.type !== "multiline") return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: properties.width }}>
      <label className="text-sm font-medium">
        {properties.label}
        {properties.isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">{properties.placeholder}</option>
        {properties.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
