"use client";
import { useFormElementsStore } from "@/lib/store/form-elements-store";
import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Text,
  FileText,
  Lock,
  Mail,
  Hash,
  Radio,
  CheckSquare,
  ChevronDown as ChevronDownIcon,
  ToggleLeft,
  Calendar,
  Clock,
  Upload,
  Image as ImageIcon,
  PenLine,
  Heading,
  AlignLeft,
  Minus,
  Square,
  Tag,
  HelpCircle,
  Grid,
} from "lucide-react";

type SectionKey =
  | "Basic Input Fields"
  | "Choice Controls"
  | "Date and Time Pickers"
  | "Rich Controls"
  | "Text and Layout Elements"
  | "Buttons and Navigation"
  | "Styling and Formatting";

type FormElementType =
  | "single-line"
  | "multiline"
  | "password"
  | "email"
  | "number"
  | "radio"
  | "checkbox"
  | "dropdown"
  | "toggle"
  | "date-picker"
  | "time-picker"
  | "file-upload"
  | "image-upload"
  | "signature-field"
  | "headers"
  | "paragraph"
  | "line-divider"
  | "submit-button"
  | "reset-button"
  | "custom-buttons"
  | "labels"
  | "tooltip"
  | "grid-layout";

interface FormElementsSidebarProps {
  expandedSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
}

export default function FormElementsSidebar({
  expandedSections,
  toggleSection,
}: FormElementsSidebarProps) {
  const { setSelectedElement, selectedElement } = useFormElementsStore();

  const handleElementClick = (type: FormElementType) => {
    setSelectedElement(type);
  };

  const handleDragStart = (e: React.DragEvent, type: FormElementType) => {
    e.dataTransfer.setData("text/plain", type);
  };

  return (
    <div className="h-full border-r border-input bg-background overflow-y-auto">
      <div className="p-4 flex items-center gap-3">
        <span className="font-medium text-foreground">Form Elements</span>
      </div>

      <div className="py-2">
        {Object.keys(expandedSections).map((section) => (
          <div key={section} className="px-4 py-3">
            <button
              onClick={() => toggleSection(section as SectionKey)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-foreground hover:text-primary"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  {section === "Basic Input Fields" && (
                    <Text className="w-5 h-5" />
                  )}
                  {section === "Choice Controls" && (
                    <Radio className="w-5 h-5" />
                  )}
                  {section === "Date and Time Pickers" && (
                    <Calendar className="w-5 h-5" />
                  )}
                  {section === "Rich Controls" && (
                    <Upload className="w-5 h-5" />
                  )}
                  {section === "Text and Layout Elements" && (
                    <Heading className="w-5 h-5" />
                  )}
                  {section === "Buttons and Navigation" && (
                    <Square className="w-5 h-5" />
                  )}
                  {section === "Styling and Formatting" && (
                    <Tag className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-bold">{section}</span>
              </div>
              {expandedSections[section as SectionKey] ? (
                <ChevronUp size={16} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground" />
              )}
            </button>

            {expandedSections[section as SectionKey] && (
              <div className="mt-2 pl-3 space-y-2">
                {section === "Basic Input Fields" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "single-line")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "single-line"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("single-line")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Text className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Single-line text input</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "multiline")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "multiline"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("multiline")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Multiline text area</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "password")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "password"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("password")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Password field</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "email")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "email"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("email")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Email field</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "number")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "number"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("number")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Hash className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Number field</span>
                    </div>
                  </>
                )}
                {section === "Choice Controls" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "radio")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "radio"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("radio")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Radio className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Radio buttons</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "checkbox")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "checkbox"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("checkbox")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <CheckSquare className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Checkboxes</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "dropdown")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "dropdown"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("dropdown")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <ChevronDownIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Dropdown list</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "toggle")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "toggle"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("toggle")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <ToggleLeft className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Toggle switch</span>
                    </div>
                  </>
                )}
                {section === "Date and Time Pickers" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "date-picker")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "date-picker"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("date-picker")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Date picker</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "time-picker")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "time-picker"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("time-picker")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Time picker</span>
                    </div>
                  </>
                )}
                {section === "Rich Controls" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "file-upload")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "file-upload"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("file-upload")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-sm">File upload</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "image-upload")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "image-upload"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("image-upload")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Image upload</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "signature-field")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "signature-field"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("signature-field")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <PenLine className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Signature field</span>
                    </div>
                  </>
                )}
                {section === "Text and Layout Elements" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "headers")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "headers"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("headers")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Heading className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Headers</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "paragraph")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "paragraph"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("paragraph")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <AlignLeft className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Paragraph or text block</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "line-divider")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "line-divider"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("line-divider")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Minus className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Line/Divider</span>
                    </div>
                  </>
                )}
                {section === "Buttons and Navigation" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "submit-button")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "submit-button"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("submit-button")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Square className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Submit button</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "reset-button")}
                      className={`flex items-center gap-2 py-3 px-2 rounded-[6px] ${
                        selectedElement === "reset-button"
                          ? "bg-primary/10 text-primary [&_svg]:stroke-primary"
                          : "hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary"
                      } cursor-pointer`}
                      onClick={() => handleElementClick("reset-button")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Square className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Reset/Clear button</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "custom-buttons")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded hover:bg-primary/10 cursor-pointer`}
                      onClick={() => handleElementClick("custom-buttons")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Square className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-foreground">
                        Custom navigation buttons
                      </span>
                    </div>
                  </>
                )}
                {section === "Styling and Formatting" && (
                  <>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "labels")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary cursor-pointer`}
                      onClick={() => handleElementClick("labels")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Tag className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-foreground">
                        Labels and placeholders
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "tooltip")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary cursor-pointer`}
                      onClick={() => handleElementClick("tooltip")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-foreground">
                        Tooltip or hint
                      </span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, "grid-layout")}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded hover:bg-primary/10 hover:text-primary [&_svg]:hover:stroke-primary cursor-pointer`}
                      onClick={() => handleElementClick("grid-layout")}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Grid className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-foreground">
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
