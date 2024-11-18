import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label: string;
  minDate?: Date;
}

export function DatePicker({
  date,
  onChange,
  label,
  minDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="bg-gray-100">
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-14",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
          disabled={(date) => (minDate ? date < minDate : false)}
          modifiersClassNames={{
            selected: "bg-brand text-white hover:bg-brand hover:text-white",
          }}
          showOutsideDays={false}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
