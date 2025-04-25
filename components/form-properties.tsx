"use client";

import type React from "react";

import {
  type InputProperties,
  useFormElementsStore,
} from "@/lib/store/form-elements-store";
import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

export default function FormProperties() {
  const store = useFormElementsStore();
  const { properties, setProperties, addFormElement, clearSelectedElement } =
    store;
  const [localProperties, setLocalProperties] =
    useState<InputProperties | null>(null);

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  useEffect(() => {
    console.log("Store state:", store);
    console.log("Properties:", properties);
  }, [store, properties]);

  if (!properties || !localProperties) {
    return (
      <div className="w-64 border-l border-[#e9eaeb] bg-white">
        <div className="p-4 border-b border-[#e9eaeb] flex items-center justify-between">
          <span className="font-medium text-[#181d27]">Properties</span>
        </div>
        <div className="p-4">
          <div className="text-sm text-[#717680]">
            Select an element to edit its properties
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setLocalProperties((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
    });
  };

  const handleSave = () => {
    if (localProperties) {
      setProperties(localProperties);
      addFormElement();
    }
  };

  const handleCancel = () => {
    clearSelectedElement();
  };

  const renderPropertiesForm = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#344054]">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={localProperties.label}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#e9eaeb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e3f6f1] focus:border-[#3e9e86]"
          />
        </div>

        {(localProperties.type === "single-line" ||
          localProperties.type === "multiline" ||
          localProperties.type === "password" ||
          localProperties.type === "email" ||
          localProperties.type === "number" ||
          localProperties.type === "dropdown") && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#344054]">
              Placeholder
            </label>
            <input
              type="text"
              name="placeholder"
              value={localProperties.placeholder}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#e9eaeb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e3f6f1] focus:border-[#3e9e86]"
            />
          </div>
        )}

        {(localProperties.type === "radio" ||
          localProperties.type === "checkbox" ||
          localProperties.type === "dropdown") && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#344054]">
              Options
            </label>
            <div className="space-y-2">
              {(localProperties as any).options.map(
                (option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [
                          ...(localProperties as any).options,
                        ];
                        newOptions[index] = e.target.value;
                        setLocalProperties({
                          ...localProperties,
                          options: newOptions,
                        } as any);
                      }}
                      className="flex-1 px-3 py-2 border border-[#e9eaeb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e3f6f1] focus:border-[#3e9e86]"
                    />
                    <button
                      onClick={() => {
                        const newOptions = (
                          localProperties as any
                        ).options.filter((_: string, i: number) => i !== index);
                        setLocalProperties({
                          ...localProperties,
                          options: newOptions,
                        } as any);
                      }}
                      className="text-[#d92d20] hover:text-[#b42318]"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )
              )}
              <button
                onClick={() => {
                  setLocalProperties({
                    ...localProperties,
                    options: [
                      ...(localProperties as any).options,
                      `Option ${(localProperties as any).options.length + 1}`,
                    ],
                  } as any);
                }}
                className="w-full px-3 py-2 text-sm text-[#3e9e86] hover:text-[#2f7765] border border-[#e3f6f1] rounded-md"
              >
                Add Option
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[#344054]">
            Width
          </label>
          <div className="relative">
            <select
              name="width"
              value={localProperties.width}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#e9eaeb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e3f6f1] focus:border-[#3e9e86] appearance-none pr-10"
            >
              <option value="100%">Full width</option>
              <option value="75%">75%</option>
              <option value="50%">50%</option>
              <option value="25%">25%</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#98a2b3]" />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isRequired"
            checked={localProperties.isRequired}
            onChange={handleChange}
            className="h-4 w-4 text-[#3e9e86] focus:ring-[#e3f6f1] border-[#e9eaeb] rounded"
            id="required-field"
          />
          <label
            htmlFor="required-field"
            className="ml-2 block text-sm text-[#344054]"
          >
            Make this field required
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 border-l border-[#e9eaeb] bg-white">
      <div className="p-4 border-b border-[#e9eaeb] flex items-center justify-between">
        <span className="font-medium text-[#181d27]">Properties</span>
        <button
          onClick={handleCancel}
          className="text-[#98a2b3] hover:text-[#344054]"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {renderPropertiesForm()}
        <div className="pt-4 mt-4 border-t border-[#e9eaeb] flex justify-end space-x-2">
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
      </div>
    </div>
  );
}
