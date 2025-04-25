"use client";
import { useFormElementsStore } from "@/lib/store/form-elements-store";
import type React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

type SectionKey =
  | "Basic Input Fields"
  | "Choice Controls"
  | "Date and Time Pickers"
  | "Rich Controls"
  | "Text and Layout Elements"
  | "Buttons and Navigation"
  | "Styling and Formatting";

interface FormElementsSidebarProps {
  expandedSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
}

export default function FormElementsSidebar({
  expandedSections,
  toggleSection,
}: FormElementsSidebarProps) {
  const { setSelectedElement, selectedElement } = useFormElementsStore();

  const handleElementClick = (
    type:
      | "single-line"
      | "multiline"
      | "password"
      | "email"
      | "number"
      | "radio"
      | "checkbox"
      | "dropdown"
      | "toggle"
  ) => {
    setSelectedElement(type);
  };

  const handleDragStart = (
    e: React.DragEvent,
    type:
      | "single-line"
      | "multiline"
      | "password"
      | "email"
      | "number"
      | "radio"
      | "checkbox"
      | "dropdown"
      | "toggle"
  ) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <div className="h-full border-r border-[#e9eaeb] bg-white overflow-y-auto">
      <div className="p-4 border-b border-[#e9eaeb] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#e3f6f1] flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={20} height={20} />
        </div>
        <span className="font-medium text-[#181d27]">Form Elements</span>
      </div>

      <div className="py-2">
        {Object.keys(expandedSections).map((section) => (
          <div key={section} className="px-4 py-2">
            <button
              onClick={() => toggleSection(section as SectionKey)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-[#344054] hover:text-[#181d27]"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  {section === "Basic Input Fields" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 4H14M2 8H14M2 12H8"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {section === "Choice Controls" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66675 8L8.00008 9.33333L10.6667 6.66667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00008 14.6667C4.31818 14.6667 1.33341 11.6819 1.33341 8C1.33341 4.31811 4.31818 1.33334 8.00008 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8Z"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {section === "Date and Time Pickers" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="3.33334"
                        width="12"
                        height="10.6667"
                        rx="2"
                        stroke="#344054"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M2 6.66667H14"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5.33325 2V4.66667"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6667 2V4.66667"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5.33325 8.66667H5.33992"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.00008 8.66667H8.00675"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6667 8.66667H10.6734"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5.33325 11.3333H5.33992"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.00008 11.3333H8.00675"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.6667 11.3333H10.6734"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {section === "Rich Controls" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 10.6667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H5.33333"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 2H14V4"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 8L14 2"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {section === "Text and Layout Elements" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66675 4H13.3334"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.66675 8H13.3334"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.66675 12H9.33341"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {section === "Buttons and Navigation" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="12"
                        height="8"
                        rx="2"
                        stroke="#344054"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 8H10"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {section === "Styling and Formatting" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6667 8.66667V12.6667C12.6667 13.0203 12.5262 13.3594 12.2762 13.6095C12.0261 13.8595 11.687 14 11.3334 14H3.33335C2.97973 14 2.6406 13.8595 2.39055 13.6095C2.1405 13.3594 2.00002 13.0203 2.00002 12.6667V4.66667C2.00002 4.31305 2.1405 3.97391 2.39055 3.72386C2.6406 3.47381 2.97973 3.33334 3.33335 3.33334H7.33335"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 2H14V6"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66675 9.33333L14.0001 2"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span>{section}</span>
              </div>
              {expandedSections[section as SectionKey] ? (
                <ChevronUp size={16} className="text-[#98a2b3]" />
              ) : (
                <ChevronDown size={16} className="text-[#98a2b3]" />
              )}
            </button>

            {expandedSections[section as SectionKey] && (
              <div className="mt-2 pl-7 space-y-2">
                {section === "Basic Input Fields" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "single-line")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "single-line"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("single-line")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3334 4L6.00008 11.3333L2.66675 8"
                            stroke={
                              selectedElement === "single-line"
                                ? "#2f7765"
                                : "#344054"
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "single-line"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Single-line text input
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "multiline")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "multiline"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("multiline")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 4.5H13.5M2.5 8H10M2.5 11.5H7.5"
                            stroke={
                              selectedElement === "multiline"
                                ? "#2f7765"
                                : "#344054"
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "multiline"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Multiline text area
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "password")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "password"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("password")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6667 6.66667H3.33333C2.59695 6.66667 2 7.26362 2 8V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V8C14 7.26362 13.403 6.66667 12.6667 6.66667Z"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.66675 6.66667V4.66667C4.66675 3.78261 5.01794 2.93477 5.64306 2.30964C6.26818 1.68452 7.11603 1.33333 8.00008 1.33333C8.88414 1.33333 9.73198 1.68452 10.3571 2.30964C10.9822 2.93477 11.3334 3.78261 11.3334 4.66667V6.66667"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "password"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Password field
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "email")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "email"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("email")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66675 4H13.3334M5.33341 4V12M10.6667 4V12M2.66675 12H13.3334M4.00008 12V14.6667H12.0001V12"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66675 1.33333L8.00008 2.66667L9.33341 1.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "email"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Email field
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "number")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "number"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("number")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00008 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00008 1.33337C4.31818 1.33337 1.33341 4.31814 1.33341 8.00004C1.33341 11.6819 4.31818 14.6667 8.00008 14.6667Z"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 4V8L10.6667 9.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "number"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Number field
                      </span>
                    </div>
                  </>
                )}
                {section === "Choice Controls" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "radio")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "radio"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("radio")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6.5"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <circle cx="8" cy="8" r="3" fill="#344054" />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "radio"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Radio buttons
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "checkbox")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "checkbox"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("checkbox")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2.5"
                            y="2.5"
                            width="11"
                            height="11"
                            rx="1.5"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 8L7 10L11 6"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "checkbox"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Checkboxes
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "dropdown")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "dropdown"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("dropdown")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4H14M2 8H14M2 12H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "dropdown"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Dropdown list
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "toggle")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded ${
                        selectedElement === "toggle"
                          ? "bg-[#e3f6f1]"
                          : "hover:bg-[#f9fcfc]"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("toggle")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="4"
                            width="12"
                            height="8"
                            rx="4"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <circle cx="10" cy="8" r="2" fill="#344054" />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedElement === "toggle"
                            ? "text-[#2f7765]"
                            : "text-[#344054]"
                        }`}
                      >
                        Toggle switch
                      </span>
                    </div>
                  </>
                )}
                {section === "Date and Time Pickers" && (
                  <>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="3.33334"
                            width="12"
                            height="10.6667"
                            rx="2"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2 6.66667H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5.33325 2V4.66667"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.6667 2V4.66667"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Date picker
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6.5"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M8 4V8L10.6667 9.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Time picker
                      </span>
                    </div>
                  </>
                )}
                {section === "Rich Controls" && (
                  <>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 10.6667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H5.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2H14V4"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 8L14 2"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        File upload
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 12L5.33333 8.66667L7.33333 10.6667L14 4"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.6667 4H14V7.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Image upload
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 12H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.33325 9.33333L7.99992 4.66667L12.6666 9.33333"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Signature field
                      </span>
                    </div>
                  </>
                )}
                {section === "Text and Layout Elements" && (
                  <>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 8H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 12H8"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">Headers</span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 7H12"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 10H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 13H10"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Paragraph or text block
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Line/Divider
                      </span>
                    </div>
                  </>
                )}
                {section === "Buttons and Navigation" && (
                  <>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="4"
                            width="12"
                            height="8"
                            rx="2"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 8H10"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Submit button
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="4"
                            width="12"
                            height="8"
                            rx="2"
                            stroke="#344054"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 8H10"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 6V10"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Reset/Clear button
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00008 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00008 1.33337C4.31818 1.33337 1.33341 4.31814 1.33341 8.00004C1.33341 11.6819 4.31818 14.6667 8.00008 14.6667Z"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33325 8H10.6666"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 5.33337V10.6667"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Custom navigation buttons
                      </span>
                    </div>
                  </>
                )}
                {section === "Styling and Formatting" && (
                  <>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4H14"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4 8H12"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6 12H10"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Labels and placeholders
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00008 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00008 1.33337C4.31818 1.33337 1.33341 4.31814 1.33341 8.00004C1.33341 11.6819 4.31818 14.6667 8.00008 14.6667Z"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 5.33337V8.00004"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 10.6666H8.00667"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Tooltip or hint
                      </span>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#f9fcfc] cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="5"
                            height="5"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="2"
                            y="9"
                            width="5"
                            height="5"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="9"
                            y="2"
                            width="5"
                            height="5"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="9"
                            y="9"
                            width="5"
                            height="5"
                            stroke="#344054"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-[#344054]">
                        Grid layout or column split
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
