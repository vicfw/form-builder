"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputProperties } from "@/lib/store/form-elements-store";

interface DatePickerFieldProps {
  properties: InputProperties;
  id: string;
}

export default function DatePickerField({
  properties,
  id,
}: DatePickerFieldProps) {
  const { label, isRequired, placeholder, width } = properties;
  const [date, setDate] = React.useState<Date>();

  return (
    <div className={cn("flex flex-col gap-2", `max-w-[200px] w-full`)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-destructive ms-1">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : placeholder || "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
