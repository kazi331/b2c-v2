import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DatePickerProps {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label: string;
  minDate?: Date;
  className?: string;
}

export function DatePicker({
  date,
  onChange,
  label,
  minDate,
  className,
}: DatePickerProps) {
  return (
    <div className={cn("relative gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild className="bg-gray-100 border-none">
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-24",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              <div className="flex flex-col items-start">
                <span className="text-sm text-muted-foreground uppercase">
                  Journey Date
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-slate-500">
                    {format(date, "d")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(date, "MMM yy")}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(date, "EEEE")}
                </div>
              </div>
            ) : (
              label
            )}
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
    </div>
  );
}
