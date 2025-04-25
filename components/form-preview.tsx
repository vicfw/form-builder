"use client";

import type React from "react";

import { useFormElementsStore } from "@/lib/store/form-elements-store";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

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
      ref.current.classList.add("border-[#3e9e86]", "bg-[#f9fcfc]");
    }
  };

  const handleDragLeave = (
    e: React.DragEvent,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.classList.remove("border-[#3e9e86]", "bg-[#f9fcfc]");
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.classList.remove("border-[#3e9e86]", "bg-[#f9fcfc]");
    }
    const type = e.dataTransfer.getData("text/plain");
    if (
      type === "single-line" ||
      type === "multiline" ||
      type === "email" ||
      type === "number" ||
      type === "radio" ||
      type === "checkbox" ||
      type === "dropdown" ||
      type === "toggle"
    ) {
      addElementByType(type);
    }
  };

  const renderFormElement = (element: typeof properties) => {
    if (!element) return null;

    const commonClasses =
      "w-full px-3 py-2 border border-[#e9eaeb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e3f6f1] focus:border-[#3e9e86]";
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
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
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
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <textarea
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass} min-h-[100px]`}
          />
        </div>
      );
    } else if (element.type === "password") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <input
            type="password"
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass}`}
            defaultValue="••••••••"
          />
        </div>
      );
    } else if (element.type === "email") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <input
            type="email"
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass}`}
          />
        </div>
      );
    } else if (element.type === "number") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <input
            type="number"
            placeholder={element.placeholder}
            className={`${commonClasses} ${widthClass}`}
          />
        </div>
      );
    } else if (element.type === "radio") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <div className={`space-y-2 ${widthClass}`}>
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name={element.label}
                  id={`${element.label}-${index}`}
                  className="h-4 w-4 text-[#3e9e86] focus:ring-[#e3f6f1] border-[#e9eaeb]"
                />
                <label
                  htmlFor={`${element.label}-${index}`}
                  className="ml-2 block text-sm text-[#344054]"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (element.type === "checkbox") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <div className={`space-y-2 ${widthClass}`}>
            {element.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name={element.label}
                  id={`${element.label}-${index}`}
                  className="h-4 w-4 text-[#3e9e86] focus:ring-[#e3f6f1] border-[#e9eaeb] rounded"
                />
                <label
                  htmlFor={`${element.label}-${index}`}
                  className="ml-2 block text-sm text-[#344054]"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (element.type === "dropdown") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <div className={`relative ${widthClass}`}>
            <select className={`${commonClasses} appearance-none pr-10`}>
              <option value="">{element.placeholder}</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#98a2b3]" />
            </div>
          </div>
        </div>
      );
    } else if (element.type === "toggle") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#344054]">
            {element.label}
            {element.isRequired && (
              <span className="text-[#d92d20] ml-1">*</span>
            )}
          </label>
          <div className={`flex items-center ${widthClass}`}>
            <div className="w-10 h-6 rounded-full p-1 bg-[#3e9e86] cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-4" />
            </div>
            <span className="ml-2 text-sm text-[#344054]">Toggle switch</span>
          </div>
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
    <div className="flex-1 p-6 flex flex-col h-full">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 mb-6">
        <button
          onClick={handleCancel}
          className="px-3 py-2 text-sm font-medium text-[#344054] bg-white border border-[#e9eaeb] rounded-md hover:bg-[#fafafa]"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 text-sm font-medium text-white bg-[#3e9e86] rounded-md hover:bg-[#2f7765]"
        >
          Save
        </button>
      </div>

      {/* Scrollable Form Items Container */}
      <div ref={itemsContainerRef} className="flex-1 overflow-y-auto">
        {formElements.length > 0 && (
          <div className="space-y-6">
            {formElements.map((element, index) => (
              <div
                key={index}
                className="border-b border-[#e9eaeb] pb-4 last:border-b-0"
              >
                {renderFormElement(element)}
              </div>
            ))}
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
          className="border-2 border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
        >
          Drag and drop elements here
        </div>
        <div
          ref={dropZone2Ref}
          onDragOver={(e) => handleDragOver(e, dropZone2Ref)}
          onDragLeave={(e) => handleDragLeave(e, dropZone2Ref)}
          onDrop={(e) => handleDrop(e, dropZone2Ref)}
          className="border-2 border-dashed border-[#e9eaeb] rounded-md p-8 flex items-center justify-center text-[#717680] transition-colors duration-200"
        >
          Drag and drop elements here
        </div>
      </div>
    </div>
  );
}
