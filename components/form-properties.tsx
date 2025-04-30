"use client";

import type React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type InputProperties,
  useFormElementsStore,
} from "@/lib/store/form-elements-store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
      <div className="w-full border-l border-border bg-background">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="font-medium text-foreground">Properties</span>
        </div>
        <div className="p-4">
          <div className="text-sm text-muted-foreground">
            Select an element to edit its properties
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (localProperties) {
      setProperties(localProperties);
      addFormElement();
    }
  };

  const handleCancel = () => {
    clearSelectedElement();
  };

  const renderProperties = () => {
    if (!properties) return null;

    switch (properties.type) {
      case "single-line":
      case "multiline":
      case "password":
      case "email":
      case "number":
      case "dropdown":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    label: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={properties.placeholder}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    placeholder: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Width</Label>
              <Select
                value={properties.width}
                onValueChange={(value: "100%" | "75%" | "50%" | "25%") =>
                  setProperties({
                    ...properties,
                    width: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100%">Full width</SelectItem>
                  <SelectItem value="75%">Three quarters</SelectItem>
                  <SelectItem value="50%">Half width</SelectItem>
                  <SelectItem value="25%">Quarter width</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.isRequired}
                onCheckedChange={(checked) =>
                  setProperties({
                    ...properties,
                    isRequired: checked as boolean,
                  })
                }
              />
              <Label htmlFor="required">Required field</Label>
            </div>
          </div>
        );
      case "radio":
      case "checkbox":
      case "dropdown":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    label: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {properties.options?.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        if (!properties.options) return;
                        const newOptions = [...properties.options];
                        newOptions[index] = e.target.value;
                        setProperties({
                          ...properties,
                          options: newOptions,
                        });
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = properties?.options?.filter(
                          (_, i) => i !== index
                        );
                        setProperties({
                          ...properties,
                          options: newOptions,
                        });
                      }}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setProperties({
                      ...properties,
                      options: [
                        ...(properties.options || []),
                        `Option ${(
                          (properties.options?.length || 0) + 1
                        ).toString()}`,
                      ],
                    });
                  }}
                  className="w-full px-3 py-2 text-sm text-primary hover:text-primary/80 border border-input rounded-md"
                >
                  Add Option
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.isRequired}
                onCheckedChange={(checked) =>
                  setProperties({
                    ...properties,
                    isRequired: checked as boolean,
                  })
                }
              />
              <Label htmlFor="required">Required field</Label>
            </div>
          </div>
        );
      case "time-picker":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    label: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={properties.placeholder}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    placeholder: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Width</Label>
              <Select
                value={properties.width}
                onValueChange={(value: "100%" | "75%" | "50%" | "25%") =>
                  setProperties({
                    ...properties,
                    width: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100%">Full width</SelectItem>
                  <SelectItem value="75%">Three quarters</SelectItem>
                  <SelectItem value="50%">Half width</SelectItem>
                  <SelectItem value="25%">Quarter width</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Start Time</Label>
              <div className="flex gap-2">
                <Select
                  value={properties.minTime?.hour || ""}
                  onValueChange={(hour) =>
                    setProperties({
                      ...properties,
                      minTime: {
                        hour,
                        minute: properties.minTime?.minute || "00",
                        period: properties.minTime?.period || "AM",
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) =>
                      (i + 1).toString().padStart(2, "0")
                    ).map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={properties.minTime?.minute || ""}
                  onValueChange={(minute) =>
                    setProperties({
                      ...properties,
                      minTime: {
                        hour: properties.minTime?.hour || "12",
                        minute,
                        period: properties.minTime?.period || "AM",
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) =>
                      i.toString().padStart(2, "0")
                    ).map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={properties.minTime?.period || "AM"}
                  onValueChange={(period: "AM" | "PM") =>
                    setProperties({
                      ...properties,
                      minTime: {
                        hour: properties.minTime?.hour || "12",
                        minute: properties.minTime?.minute || "00",
                        period,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default End Time</Label>
              <div className="flex gap-2">
                <Select
                  value={properties.maxTime?.hour || ""}
                  onValueChange={(hour) =>
                    setProperties({
                      ...properties,
                      maxTime: {
                        hour,
                        minute: properties.maxTime?.minute || "00",
                        period: properties.maxTime?.period || "PM",
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) =>
                      (i + 1).toString().padStart(2, "0")
                    ).map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={properties.maxTime?.minute || ""}
                  onValueChange={(minute) =>
                    setProperties({
                      ...properties,
                      maxTime: {
                        hour: properties.maxTime?.hour || "12",
                        minute,
                        period: properties.maxTime?.period || "PM",
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) =>
                      i.toString().padStart(2, "0")
                    ).map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={properties.maxTime?.period || "PM"}
                  onValueChange={(period: "AM" | "PM") =>
                    setProperties({
                      ...properties,
                      maxTime: {
                        hour: properties.maxTime?.hour || "12",
                        minute: properties.maxTime?.minute || "00",
                        period,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.isRequired}
                onCheckedChange={(checked) =>
                  setProperties({
                    ...properties,
                    isRequired: checked as boolean,
                  })
                }
              />
              <Label htmlFor="required">Required field</Label>
            </div>
          </div>
        );
      case "date-picker":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={properties.label}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    label: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={properties.placeholder}
                onChange={(e) =>
                  setProperties({
                    ...properties,
                    placeholder: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Width</Label>
              <Select
                value={properties.width}
                onValueChange={(value: "100%" | "75%" | "50%" | "25%") =>
                  setProperties({
                    ...properties,
                    width: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100%">Full width</SelectItem>
                  <SelectItem value="75%">Three quarters</SelectItem>
                  <SelectItem value="50%">Half width</SelectItem>
                  <SelectItem value="25%">Quarter width</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={properties.isRequired}
                onCheckedChange={(checked) =>
                  setProperties({
                    ...properties,
                    isRequired: checked as boolean,
                  })
                }
              />
              <Label htmlFor="required">Required field</Label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full border-l border-border bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="font-medium text-foreground">Properties</span>
        <button
          onClick={handleCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {renderProperties()}
        <div className="pt-4 mt-4 border-t border-border flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-3 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
