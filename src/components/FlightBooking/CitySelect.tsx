import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CITIES = [
  { value: "DAC", label: "Dhaka (DAC)", country: "Bangladesh" },
  { value: "CXB", label: "Cox's Bazar (CXB)", country: "Bangladesh" },
  { value: "CGP", label: "Chittagong (CGP)", country: "Bangladesh" },
  { value: "ZYL", label: "Sylhet (ZYL)", country: "Bangladesh" },
  { value: "JSR", label: "Jessore (JSR)", country: "Bangladesh" },
];

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  excludeCity?: string;
}

export function CitySelect({ value, onChange, placeholder, excludeCity }: CitySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {CITIES.filter(city => city.value !== excludeCity).map((city) => (
          <SelectItem key={city.value} value={city.value}>
            <div className="flex flex-col">
              <span className="font-medium">{city.label}</span>
              <span className="text-sm text-muted-foreground">{city.country}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}