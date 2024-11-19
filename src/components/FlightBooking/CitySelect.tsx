import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* const CITIES = [
  { value: "DAC", label: "Dhaka (DAC)", country: "Bangladesh" },
  { value: "CXB", label: "Cox's Bazar (CXB)", country: "Bangladesh" },
  { value: "CGP", label: "Chittagong (CGP)", country: "Bangladesh" },
  { value: "ZYL", label: "Sylhet (ZYL)", country: "Bangladesh" },
  { value: "JSR", label: "Jessore (JSR)", country: "Bangladesh" },
]; */

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  excludeCity?: string;
  className?: string;
  label?: string;
}

const airports = [
  {
    code: "ZYZ",
    name: "Berchem Railway Stn.",
    city: "Antwerp",
    state: "Flanders",
    country: "Belgium",
  },
  {
    code: "ZYR",
    name: "Brussels Midi Railway Station",
    city: "Brussels",
    state: "Vlaams Brabant",
    country: "Belgium",
  },
  {
    code: "ZYL",
    name: "Osmany Intl",
    city: "Sylhet",
    state: "Sylhet",
    country: "Bangladesh",
  },
  {
    code: "ZYI",
    name: "Zunyi",
    city: "Zunyi",
    state: "Guizhou",
    country: "China",
  },
];

export function CitySelect({
  value,
  onChange,
  placeholder,
  excludeCity,
  className,
  label,
}: CitySelectProps) {
  console.log(value)
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full h-24 max-w- bg-gray-100 focus:ring-0 relative truncate border-none",
          className
        )}
      >
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground uppercase text-left">{label}</span>
          <SelectValue placeholder={placeholder} className="p-10 font-extrabold" />
        </div>
      </SelectTrigger>
      <SelectContent className=" max-w-">
        {airports
          .filter((airport) => airport.city !== excludeCity)
          .map((airport) => (
            <SelectItem key={airport.code} value={airport.code}>
              <div className="flex flex-col items-start">
                <span className="font-bold">
                  {airport.city}, {airport.country}
                </span>
                <span className="text-sm text-muted-foreground  truncate">
                  {airport.code}, {airport.name}
                </span>
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
