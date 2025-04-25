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
  const dropZone1Ref = useRef<HTMLDivElement>(null);
  const dropZone2Ref = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Scroll to bottom when form elements change
  useEffect(() => {
    if (itemsContainerRef.current) {
      itemsContainerRef.current.scrollTop =
        itemsContainerRef.current.scrollHeight;
    }
  }, [formElements]);

  const handleDragOver = (
    e: React.DragEvent,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.classList.add("border-blue-500", "bg-blue-50");
    }
  };

  const handleDragLeave = (
    e: React.DragEvent,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.classList.remove("border-blue-500", "bg-blue-50");
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.classList.remove("border-blue-500", "bg-blue-50");
    }
    const type = e.dataTransfer.getData("text/plain");
    if (type === "single-line" || type === "multiline") {
      addElementByType(type);
    }
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
    <div className="flex-1 border-r border-[#e9eaeb] p-4 flex flex-col h-full">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 mb-4">
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

      {/* Scrollable Form Items Container */}
      <div
        ref={itemsContainerRef}
        className="h-[calc(100vh-250px)] overflow-y-auto"
      >
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
      </div>

      {/* Fixed Drop Zones */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div
          ref={dropZone1Ref}
          onDragOver={(e) => handleDragOver(e, dropZone1Ref)}
          onDragLeave={(e) => handleDragLeave(e, dropZone1Ref)}
          onDrop={(e) => handleDrop(e, dropZone1Ref)}
          className="border border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
        >
          Drop zone 1
        </div>
        <div
          ref={dropZone2Ref}
          onDragOver={(e) => handleDragOver(e, dropZone2Ref)}
          onDragLeave={(e) => handleDragLeave(e, dropZone2Ref)}
          onDrop={(e) => handleDrop(e, dropZone2Ref)}
          className="border border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
        >
          Drop zone 2
        </div>
      </div>
    </div>
  );
}
