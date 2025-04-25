import { create } from "zustand";

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
    | "toggle";
  label: string;
  placeholder: string;
  width: "100%" | "75%" | "50%" | "25%";
  isRequired: boolean;
  options?: string[];
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
  ) => void;
}

export const useFormElementsStore = create<FormElementsStore>((set, get) => ({
  properties: null,
  formElements: [],
  selectedElement: null,
  setProperties: (properties) => set({ properties }),
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
    }

    if (defaultProperties) {
      set((state) => ({
        formElements: [...state.formElements, defaultProperties],
      }));
    }
  },
}));
