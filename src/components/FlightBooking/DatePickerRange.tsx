"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({
  dateRange,
  setDateRange,
}: React.HTMLAttributes<HTMLDivElement> & {
  dateRange: DateRange;
  setDateRange: (date: DateRange) => void;
}) {
  const today = new Date();

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      <Popover>
        <PopoverTrigger asChild className="col-span-2 bg-gray-100">
          <Button
            id="departure-date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-14",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              format(dateRange.from, "LLL dd, y")
            ) : (
              <span>Pick a departure date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => setDateRange(range as DateRange)}
            numberOfMonths={2}
            disabled={{ before: today }}
            modifiersClassNames={{
              selected: "bg-brand text-white hover:bg-brand hover:text-white",
            }}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild className="col-span-2 bg-gray-100">
          <Button
            id="arrival-date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-14",
              !dateRange?.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.to ? (
              format(dateRange.to, "LLL dd, y")
            ) : (
              <span>Pick an arrival date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.to}
            selected={dateRange}
            onSelect={(range) => setDateRange(range as DateRange)}
            numberOfMonths={2}
            disabled={{ before: today }}
            modifiersClassNames={{
              selected: "bg-brand text-white hover:bg-brand hover:text-white",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
