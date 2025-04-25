"use client";

import { useFormElementsStore } from "@/lib/store/form-elements-store";
import { useEffect, useRef } from "react";

export default function FormPreview() {
  const {
    properties,
    formElements,
    saveToLocalStorage,
    clearLocalStorage,
    loadFromLocalStorage,
    addElementByType,
  } = useFormElementsStore();
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleDragStart = (
    e: React.DragEvent,
    type: "single-line" | "multiline"
  ) => {
    e.dataTransfer.setData("text/plain", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-blue-500", "bg-blue-50");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-blue-500", "bg-blue-50");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-blue-500", "bg-blue-50");
    }
    const type = e.dataTransfer.getData("text/plain") as
      | "single-line"
      | "multiline";
    addElementByType(type);
  };

  const renderFormElement = (element: typeof properties) => {
    if (!element) return null;

    const commonClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    const widthClass =
      element.width === "100%"
        ? "w-full"
        : element.width === "75%"
        ? "w-3/4"
        : element.width === "50%"
        ? "w-1/2"
        : element.width === "25%"
        ? "w-1/4"
        : "w-auto";

    if (element.type === "single-line") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {element.label}
            {element.isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="text"
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass}`}
          />
        </div>
      );
    } else if (element.type === "multiline") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {element.label}
            {element.isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass} min-h-[100px]`}
          />
        </div>
      );
    }
  };

  const handleSave = () => {
    saveToLocalStorage();
    alert("Form elements saved successfully!");
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all form elements? This action cannot be undone."
      )
    ) {
      clearLocalStorage();
    }
  };

  return (
    <div className="flex-1 border-r border-[#e9eaeb] p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
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

        {/* Form Elements List */}
        {formElements.length > 0 && (
          <div className="border border-[#e9eaeb] rounded-md p-8">
            <div className="space-y-6">
              {formElements.map((element, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  {renderFormElement(element)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drag and Drop Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="border border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
          >
            Drop zone 1
          </div>
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="border border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
          >
            Drop zone 2
          </div>
        </div>
      </div>
    </div>
  );
}
