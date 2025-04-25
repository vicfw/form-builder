"use client";
import { useFormElementsStore } from "@/lib/store/form-elements-store";
import {
  AlignJustify,
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleDot,
  Clock,
  Edit3,
  FileText,
  Grid,
  Hash,
  Heading,
  HelpCircle,
  ImageIcon,
  List,
  Lock,
  Mail,
  Minus,
  Navigation,
  RotateCcw,
  Send,
  Settings,
  Tag,
  TextIcon,
  ToggleLeft,
  User,
} from "lucide-react";

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
  const { setSelectedElement } = useFormElementsStore();

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
    <div className="bg-white rounded-lg border border-[#e9eaeb] p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Form Elements</h2>
      <div className="space-y-2">
        {Object.keys(expandedSections).map((section) => (
          <div key={section} className="space-y-2">
            <button
              onClick={() => toggleSection(section as SectionKey)}
              className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {expandedSections[section as SectionKey] ? (
                <ChevronDownIcon className="h-5 w-5 mr-2" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 mr-2" />
              )}
              {section}
            </button>
            {expandedSections[section as SectionKey] && (
              <div className="pl-7 space-y-1">
                {section === "Basic Input Fields" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "single-line")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("single-line")}
                    >
                      <TextIcon className="w-4 h-4 mr-2" />
                      <span>Single-line text input</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "multiline")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("multiline")}
                    >
                      <AlignLeft className="w-4 h-4 mr-2" />
                      <span>Multiline text area</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "password")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("password")}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      <span>Password field</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "email")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("email")}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span>Email field</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "number")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("number")}
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      <span>Number field</span>
                    </div>
                  </>
                )}
                {section === "Choice Controls" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "radio")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("radio")}
                    >
                      <CircleDot className="w-4 h-4 mr-2" />
                      <span>Radio buttons</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "checkbox")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("checkbox")}
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      <span>Checkboxes</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "dropdown")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("dropdown")}
                    >
                      <List className="w-4 h-4 mr-2" />
                      <span>Dropdown list</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "toggle")}
                      className="flex items-center text-sm text-[#475467] cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleElementClick("toggle")}
                    >
                      <ToggleLeft className="w-4 h-4 mr-2" />
                      <span>Toggle switch</span>
                    </div>
                  </>
                )}
                {section === "Date and Time Pickers" && (
                  <>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Date picker</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Time picker</span>
                    </div>
                  </>
                )}
                {section === "Rich Controls" && (
                  <>
                    <div className="flex items-center text-sm text-[#475467]">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>File upload</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      <span>Image upload</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Edit3 className="w-4 h-4 mr-2" />
                      <span>Signature field</span>
                    </div>
                  </>
                )}
                {section === "Text and Layout Elements" && (
                  <>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Heading className="w-4 h-4 mr-2" />
                      <span>Headers</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <AlignJustify className="w-4 h-4 mr-2" />
                      <span>Paragraph or text block</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Minus className="w-4 h-4 mr-2" />
                      <span>Line/Divider</span>
                    </div>
                  </>
                )}
                {section === "Buttons and Navigation" && (
                  <>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Send className="w-4 h-4 mr-2" />
                      <span>Submit button</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      <span>Reset/Clear button</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Navigation className="w-4 h-4 mr-2" />
                      <span>Custom navigation buttons</span>
                    </div>
                  </>
                )}
                {section === "Styling and Formatting" && (
                  <>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Tag className="w-4 h-4 mr-2" />
                      <span>Labels and placeholders</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      <span>Tooltip or hint</span>
                    </div>
                    <div className="flex items-center text-sm text-[#475467]">
                      <Grid className="w-4 h-4 mr-2" />
                      <span>Grid layout or column split</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <div className="border-t border-[#e9eaeb] py-2">
          <div className="flex items-center px-4 py-2">
            <Settings className="w-4 h-4 mr-2 text-[#475467]" />
            <span className="text-sm text-[#344054]">Settings</span>
          </div>
          <div className="flex items-center px-4 py-2">
            <User className="w-4 h-4 mr-2 text-[#475467]" />
            <span className="text-sm text-[#344054]">Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
