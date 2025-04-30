import { create } from "zustand";
import { useMemo } from "react";

// Memoized arrays for time values
export const useTimeArrays = () => {
  const hours = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")),
    []
  );

  const minutes = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")),
    []
  );

  return { hours, minutes };
};

export interface InputProperties {
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
  label: string;
  placeholder: string;
  width: "100%" | "75%" | "50%" | "25%";
  isRequired: boolean;
  options?: string[];
  minTime?: {
    hour: string;
    minute: string;
    period: "AM" | "PM";
  };
  maxTime?: {
    hour: string;
    minute: string;
    period: "AM" | "PM";
  };
}

export interface RadioInputProperties extends InputProperties {
  type: "radio";
  options: string[];
}

export interface CheckboxInputProperties extends InputProperties {
  type: "checkbox";
  options: string[];
}

export interface DropdownInputProperties extends InputProperties {
  type: "dropdown";
  options: string[];
}

export interface ToggleInputProperties extends InputProperties {
  type: "toggle";
}

interface FormElementsStore {
  properties: InputProperties | null;
  formElements: InputProperties[];
  selectedElement:
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
    | "grid-layout"
    | null;
  setProperties: (properties: InputProperties) => void;
  addFormElement: () => void;
  setSelectedElement: (
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
      | "grid-layout"
  ) => void;
  clearSelectedElement: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
  addElementByType: (
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
      | "grid-layout"
  ) => void;
}

export const useFormElementsStore = create<FormElementsStore>((set, get) => ({
  properties: null,
  formElements: [],
  selectedElement: null,
  setProperties: (properties) => {
    if (properties?.type === "time-picker") {
      set({ properties });
    } else {
      set({ properties });
    }
  },
  addFormElement: () => {
    const properties = get().properties;
    if (properties) {
      set((state) => ({
        formElements: [...state.formElements, properties],
        properties: null,
        selectedElement: null,
      }));
    }
  },
  setSelectedElement: (type) => {
    let defaultProperties: InputProperties | null = null;

    if (type === "single-line") {
      defaultProperties = {
        type: "single-line",
        label: "Single-line Text Input",
        placeholder: "Enter text here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "multiline") {
      defaultProperties = {
        type: "multiline",
        label: "Multiline Text Area",
        placeholder: "Enter text here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "password") {
      defaultProperties = {
        type: "password",
        label: "Password Field",
        placeholder: "Enter password here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "email") {
      defaultProperties = {
        type: "email",
        label: "Email Field",
        placeholder: "Enter email here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "number") {
      defaultProperties = {
        type: "number",
        label: "Number Field",
        placeholder: "Enter number here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "radio") {
      defaultProperties = {
        type: "radio",
        label: "Radio Buttons",
        placeholder: "",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "checkbox") {
      defaultProperties = {
        type: "checkbox",
        label: "Checkboxes",
        placeholder: "",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "dropdown") {
      defaultProperties = {
        type: "dropdown",
        label: "Dropdown List",
        placeholder: "Select an option",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "toggle") {
      defaultProperties = {
        type: "toggle",
        label: "Toggle Switch",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "date-picker") {
      defaultProperties = {
        type: "date-picker",
        label: "Date Picker",
        placeholder: "Select date",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "time-picker") {
      defaultProperties = {
        type: "time-picker",
        label: "Time Picker",
        placeholder: "Select time",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "file-upload") {
      defaultProperties = {
        type: "file-upload",
        label: "File Upload",
        placeholder: "Upload file",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "image-upload") {
      defaultProperties = {
        type: "image-upload",
        label: "Image Upload",
        placeholder: "Upload image",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "signature-field") {
      defaultProperties = {
        type: "signature-field",
        label: "Signature Field",
        placeholder: "Sign here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "headers") {
      defaultProperties = {
        type: "headers",
        label: "Header",
        placeholder: "Enter header text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "paragraph") {
      defaultProperties = {
        type: "paragraph",
        label: "Paragraph",
        placeholder: "Enter paragraph text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "line-divider") {
      defaultProperties = {
        type: "line-divider",
        label: "Line Divider",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "submit-button") {
      defaultProperties = {
        type: "submit-button",
        label: "Submit Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "reset-button") {
      defaultProperties = {
        type: "reset-button",
        label: "Reset Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "custom-buttons") {
      defaultProperties = {
        type: "custom-buttons",
        label: "Custom Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "labels") {
      defaultProperties = {
        type: "labels",
        label: "Label",
        placeholder: "Enter label text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "tooltip") {
      defaultProperties = {
        type: "tooltip",
        label: "Tooltip",
        placeholder: "Enter tooltip text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "grid-layout") {
      defaultProperties = {
        type: "grid-layout",
        label: "Grid Layout",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    }

    if (defaultProperties) {
      set({ properties: defaultProperties, selectedElement: type });
    }
  },
  clearSelectedElement: () => set({ properties: null, selectedElement: null }),
  saveToLocalStorage: () => {
    localStorage.setItem("formElements", JSON.stringify(get().formElements));
  },
  loadFromLocalStorage: () => {
    const formElements = localStorage.getItem("formElements");
    if (formElements) {
      set({ formElements: JSON.parse(formElements) });
    }
  },
  clearLocalStorage: () => {
    localStorage.removeItem("formElements");
    set({ formElements: [] });
  },
  addElementByType: (type) => {
    let defaultProperties: InputProperties | null = null;

    if (type === "single-line") {
      defaultProperties = {
        type: "single-line",
        label: "Single-line Text Input",
        placeholder: "Enter text here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "multiline") {
      defaultProperties = {
        type: "multiline",
        label: "Multiline Text Area",
        placeholder: "Enter text here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "password") {
      defaultProperties = {
        type: "password",
        label: "Password Field",
        placeholder: "Enter password here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "email") {
      defaultProperties = {
        type: "email",
        label: "Email Field",
        placeholder: "Enter email here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "number") {
      defaultProperties = {
        type: "number",
        label: "Number Field",
        placeholder: "Enter number here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "radio") {
      defaultProperties = {
        type: "radio",
        label: "Radio Buttons",
        placeholder: "",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "checkbox") {
      defaultProperties = {
        type: "checkbox",
        label: "Checkboxes",
        placeholder: "",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "dropdown") {
      defaultProperties = {
        type: "dropdown",
        label: "Dropdown List",
        placeholder: "Select an option",
        width: "100%",
        isRequired: false,
        options: ["Option 1", "Option 2"],
      };
    } else if (type === "toggle") {
      defaultProperties = {
        type: "toggle",
        label: "Toggle Switch",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "date-picker") {
      defaultProperties = {
        type: "date-picker",
        label: "Date Picker",
        placeholder: "Select date",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "time-picker") {
      defaultProperties = {
        type: "time-picker",
        label: "Time Picker",
        placeholder: "Select time",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "file-upload") {
      defaultProperties = {
        type: "file-upload",
        label: "File Upload",
        placeholder: "Upload file",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "image-upload") {
      defaultProperties = {
        type: "image-upload",
        label: "Image Upload",
        placeholder: "Upload image",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "signature-field") {
      defaultProperties = {
        type: "signature-field",
        label: "Signature Field",
        placeholder: "Sign here",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "headers") {
      defaultProperties = {
        type: "headers",
        label: "Header",
        placeholder: "Enter header text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "paragraph") {
      defaultProperties = {
        type: "paragraph",
        label: "Paragraph",
        placeholder: "Enter paragraph text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "line-divider") {
      defaultProperties = {
        type: "line-divider",
        label: "Line Divider",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "submit-button") {
      defaultProperties = {
        type: "submit-button",
        label: "Submit Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "reset-button") {
      defaultProperties = {
        type: "reset-button",
        label: "Reset Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "custom-buttons") {
      defaultProperties = {
        type: "custom-buttons",
        label: "Custom Button",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "labels") {
      defaultProperties = {
        type: "labels",
        label: "Label",
        placeholder: "Enter label text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "tooltip") {
      defaultProperties = {
        type: "tooltip",
        label: "Tooltip",
        placeholder: "Enter tooltip text",
        width: "100%",
        isRequired: false,
      };
    } else if (type === "grid-layout") {
      defaultProperties = {
        type: "grid-layout",
        label: "Grid Layout",
        placeholder: "",
        width: "100%",
        isRequired: false,
      };
    }

    if (defaultProperties) {
      set((state) => ({
        formElements: [...state.formElements, defaultProperties],
      }));
    }
  },
}));
