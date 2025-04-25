import {
  InputProperties,
  useFormElementsStore,
} from "@/lib/store/form-elements-store";
import { useState, useEffect } from "react";

export default function FormProperties() {
  const store = useFormElementsStore();
  const { properties, setProperties, addFormElement, clearSelectedElement } =
    store;
  const [localProperties, setLocalProperties] =
    useState<InputProperties | null>(null);

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  if (!properties || !localProperties) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select an element to edit its properties
      </div>
    );
  }

  const handlePropertyChange = <K extends keyof InputProperties>(
    key: K,
    value: InputProperties[K]
  ) => {
    setLocalProperties((prev) => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleSave = () => {
    if (localProperties) {
      setProperties(localProperties);
      addFormElement();
    }
  };

  const handleCancel = () => {
    clearSelectedElement();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          value={localProperties.label}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter label"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Placeholder
        </label>
        <input
          type="text"
          value={localProperties.placeholder}
          onChange={(e) => handlePropertyChange("placeholder", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter placeholder text"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <select
          value={localProperties.width}
          onChange={(e) => handlePropertyChange("width", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="100%">Full Width</option>
          <option value="75%">Three Quarters</option>
          <option value="50%">Half Width</option>
          <option value="25%">Quarter Width</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isRequired"
          checked={localProperties.isRequired}
          onChange={(e) => handlePropertyChange("isRequired", e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="isRequired"
          className="text-sm font-medium text-gray-700"
        >
          Required Field
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
