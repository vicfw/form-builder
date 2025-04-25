import { create } from "zustand";

export type InputType =
  | "single-line"
  | "multiline"
  | "password"
  | "email"
  | "number"
  | "radio"
  | "checkbox"
  | "dropdown"
  | "toggle";

export interface BaseInputProperties {
  label: string;
  placeholder: string;
  isRequired: boolean;
  width: string;
}

export interface SingleLineInputProperties extends BaseInputProperties {
  type: "single-line";
}

export interface MultilineInputProperties extends BaseInputProperties {
  type: "multiline";
}

export interface PasswordInputProperties extends BaseInputProperties {
  type: "password";
}

export interface EmailInputProperties extends BaseInputProperties {
  type: "email";
}

export interface NumberInputProperties extends BaseInputProperties {
  type: "number";
}

export interface RadioInputProperties extends BaseInputProperties {
  type: "radio";
  options: string[];
}

export interface CheckboxInputProperties extends BaseInputProperties {
  type: "checkbox";
  options: string[];
}

export interface DropdownInputProperties extends BaseInputProperties {
  type: "dropdown";
  options: string[];
}

export interface ToggleInputProperties extends BaseInputProperties {
  type: "toggle";
  label: string;
  isRequired: boolean;
  width: string;
}

export type InputProperties =
  | SingleLineInputProperties
  | MultilineInputProperties
  | PasswordInputProperties
  | EmailInputProperties
  | NumberInputProperties
  | RadioInputProperties
  | CheckboxInputProperties
  | DropdownInputProperties
  | ToggleInputProperties;

interface FormElementsStore {
  selectedElement: InputType | null;
  properties: InputProperties | null;
  formElements: InputProperties[];
  setSelectedElement: (type: InputType) => void;
  setProperties: (properties: Partial<InputProperties>) => void;
  addFormElement: () => void;
  clearSelectedElement: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
  addElementByType: (type: InputType) => void;
}

const defaultSingleLineProperties: SingleLineInputProperties = {
  type: "single-line",
  label: "Text Input",
  placeholder: "Enter text here...",
  isRequired: false,
  width: "100%",
};

const defaultMultilineProperties: MultilineInputProperties = {
  type: "multiline",
  label: "Text Area",
  placeholder: "Enter text here...",
  isRequired: false,
  width: "100%",
};

const defaultPasswordProperties: PasswordInputProperties = {
  type: "password",
  label: "Password",
  placeholder: "Enter password...",
  isRequired: false,
  width: "100%",
};

const defaultEmailProperties: EmailInputProperties = {
  type: "email",
  label: "Email",
  placeholder: "Enter email address...",
  isRequired: false,
  width: "100%",
};

const defaultNumberProperties: NumberInputProperties = {
  type: "number",
  label: "Number",
  placeholder: "Enter number...",
  isRequired: false,
  width: "100%",
};

const defaultRadioProperties: RadioInputProperties = {
  type: "radio",
  label: "Radio Buttons",
  placeholder: "",
  isRequired: false,
  width: "100%",
  options: ["Option 1", "Option 2"],
};

const defaultCheckboxProperties: CheckboxInputProperties = {
  type: "checkbox",
  label: "Checkboxes",
  placeholder: "",
  isRequired: false,
  width: "100%",
  options: ["Option 1", "Option 2"],
};

const defaultDropdownProperties: DropdownInputProperties = {
  type: "dropdown",
  label: "Dropdown",
  placeholder: "Select an option",
  isRequired: false,
  width: "100%",
  options: ["Option 1", "Option 2"],
};

const defaultToggleProperties: ToggleInputProperties = {
  type: "toggle",
  label: "Toggle Switch",
  placeholder: "",
  isRequired: false,
  width: "100%",
};

export const useFormElementsStore = create<FormElementsStore>((set, get) => ({
  selectedElement: null,
  properties: null,
  formElements: [],
  setSelectedElement: (type) => {
    console.log("Setting selected element:", type);
    const newProperties =
      type === "single-line"
        ? defaultSingleLineProperties
        : type === "multiline"
        ? defaultMultilineProperties
        : type === "password"
        ? defaultPasswordProperties
        : type === "email"
        ? defaultEmailProperties
        : type === "number"
        ? defaultNumberProperties
        : type === "radio"
        ? defaultRadioProperties
        : type === "checkbox"
        ? defaultCheckboxProperties
        : type === "dropdown"
        ? defaultDropdownProperties
        : defaultToggleProperties;
    console.log("Setting new properties:", newProperties);
    set((state) => {
      console.log("Previous state:", state);
      return {
        selectedElement: type,
        properties: newProperties,
      };
    });
  },
  setProperties: (newProperties) => {
    console.log("Updating properties:", newProperties);
    set((state) => {
      console.log("Previous state:", state);
      if (!state.properties) {
        console.log("No existing properties, returning state unchanged");
        return state;
      }
      const updatedProperties = {
        ...state.properties,
        ...newProperties,
      } as InputProperties;
      console.log("Updated properties:", updatedProperties);
      return {
        properties: updatedProperties,
      };
    });
  },
  addFormElement: () => {
    set((state) => {
      if (!state.properties) return state;
      return {
        formElements: [...state.formElements, state.properties],
        properties: null,
        selectedElement: null,
      };
    });
  },
  clearSelectedElement: () => {
    set((state) => ({
      selectedElement: null,
      properties: null,
    }));
  },
  saveToLocalStorage: () => {
    const state = get();
    localStorage.setItem(
      "form-builder-data",
      JSON.stringify({
        formElements: state.formElements,
      })
    );
  },
  loadFromLocalStorage: () => {
    const savedData = localStorage.getItem("form-builder-data");
    if (savedData) {
      const { formElements } = JSON.parse(savedData);
      set({ formElements });
    }
  },
  clearLocalStorage: () => {
    localStorage.removeItem("form-builder-data");
    set({ formElements: [] });
  },
  addElementByType: (type: InputType) => {
    const newProperties =
      type === "single-line"
        ? defaultSingleLineProperties
        : type === "multiline"
        ? defaultMultilineProperties
        : type === "password"
        ? defaultPasswordProperties
        : type === "email"
        ? defaultEmailProperties
        : type === "number"
        ? defaultNumberProperties
        : type === "radio"
        ? defaultRadioProperties
        : type === "checkbox"
        ? defaultCheckboxProperties
        : type === "dropdown"
        ? defaultDropdownProperties
        : defaultToggleProperties;
    set((state) => ({
      formElements: [...state.formElements, newProperties],
    }));
  },
}));
