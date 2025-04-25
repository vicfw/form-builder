"use client";

import { useState } from "react";
import FormElementsSidebar from "@/components/form-elements-sidebar";
import FormPreview from "@/components/form-preview";
import FormProperties from "@/components/form-properties";

type SectionKey =
  | "Basic Input Fields"
  | "Choice Controls"
  | "Date and Time Pickers"
  | "Rich Controls"
  | "Text and Layout Elements"
  | "Buttons and Navigation"
  | "Styling and Formatting";

export default function FormBuilder() {
  const [expandedSections, setExpandedSections] = useState({
    "Basic Input Fields": true,
    "Choice Controls": false,
    "Date and Time Pickers": false,
    "Rich Controls": false,
    "Text and Layout Elements": false,
    "Buttons and Navigation": false,
    "Styling and Formatting": false,
  });

  const toggleSection = (section: SectionKey) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="h-[100dvh] w-full p-4 bg-white">
      <div className="grid grid-cols-[250px_1fr_250px] h-full gap-4">
        <div className="space-y-4">
          <FormElementsSidebar
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
        <FormPreview />
        <FormProperties />
      </div>
    </div>
  );
}
