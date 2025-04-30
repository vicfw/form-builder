"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputProperties,
  useTimeArrays,
} from "@/lib/store/form-elements-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerFieldProps {
  properties: InputProperties;
  id: string;
}

interface TimeValue {
  hour: string;
  minute: string;
  period: "AM" | "PM";
}

// Memoized TimeSelector component
const TimeSelector = React.memo(
  ({
    value,
    onChange,
    label,
  }: {
    value: TimeValue;
    onChange: (value: TimeValue) => void;
    label: string;
  }) => {
    const { hours, minutes } = useTimeArrays();

    return (
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <div className="flex gap-2">
          <Select
            value={value.hour}
            onValueChange={(hour) => onChange({ ...value, hour })}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={value.minute}
            onValueChange={(minute) => onChange({ ...value, minute })}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={value.period}
            onValueChange={(period) =>
              onChange({ ...value, period: period as "AM" | "PM" })
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
    );
  }
);

TimeSelector.displayName = "TimeSelector";

export default function TimePickerField({
  properties,
  id,
}: TimePickerFieldProps) {
  const { label, isRequired, placeholder, minTime, maxTime } = properties;

  // Use useMemo for initial state to prevent recreation on each render
  const initialMinTime = React.useMemo(
    () => ({
      hour: minTime?.hour || "",
      minute: minTime?.minute || "",
      period: minTime?.period || "AM",
    }),
    [minTime]
  );

  const initialMaxTime = React.useMemo(
    () => ({
      hour: maxTime?.hour || "",
      minute: maxTime?.minute || "",
      period: maxTime?.period || "PM",
    }),
    [maxTime]
  );

  const [minTimeValue, setMinTimeValue] =
    React.useState<TimeValue>(initialMinTime);
  const [maxTimeValue, setMaxTimeValue] =
    React.useState<TimeValue>(initialMaxTime);

  // Memoize the formatTime function
  const formatTime = React.useCallback((time: TimeValue) => {
    if (!time.hour || !time.minute) return "";
    return `${time.hour}:${time.minute} ${time.period}`;
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", `max-w-[200px] w-full`)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-destructive ms-1">*</span>}
      </Label>
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={`${id}-min`}
              variant={"outline"}
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !minTimeValue.hour && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {formatTime(minTimeValue) || placeholder || "Start time"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <TimeSelector
              value={minTimeValue}
              onChange={setMinTimeValue}
              label="Start Time"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={`${id}-max`}
              variant={"outline"}
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !maxTimeValue.hour && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {formatTime(maxTimeValue) || placeholder || "End time"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <TimeSelector
              value={maxTimeValue}
              onChange={setMaxTimeValue}
              label="End Time"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
