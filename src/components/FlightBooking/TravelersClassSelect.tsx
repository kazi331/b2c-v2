import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

interface TravelersClassSelectProps {
  travelers: Travelers;
  onTravelersChange: (travelers: Travelers) => void;
  cabinClass: string;
  onCabinClassChange: (value: string) => void;
}

export function TravelersClassSelect({
  travelers,
  onTravelersChange,
  cabinClass,
  onCabinClassChange,
}: TravelersClassSelectProps) {
  const [open, setOpen] = useState(false);

  const updateTravelers = (type: keyof Travelers, value: number) => {
    const newTravelers = { ...travelers };
    newTravelers[type] = Math.max(
      type === "adults" ? 1 : 0,
      Math.min(type === "adults" ? 9 : 4, value)
    );
    onTravelersChange(newTravelers);
  };

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>
              {totalTravelers} Traveler{totalTravelers !== 1 ? "s" : ""},{" "}
              {cabinClass}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Travelers</h4>
            <TravelerCounter
              label="Adults"
              sublabel="12 years and above"
              value={travelers.adults}
              onChange={(value) => updateTravelers("adults", value)}
              min={1}
              max={9}
            />
            <TravelerCounter
              label="Children"
              sublabel="2-11 years"
              value={travelers.children}
              onChange={(value) => updateTravelers("children", value)}
              min={0}
              max={4}
            />
            <TravelerCounter
              label="Infant"
              sublabel="Below 2 years"
              value={travelers.infants}
              onChange={(value) => updateTravelers("infants", value)}
              min={0}
              max={4}
            />
          </div>

          <div className="space-y-2">
            <h4 className="font-medium leading-none">Class</h4>
            <RadioGroup
              value={cabinClass}
              onValueChange={onCabinClassChange}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Economy" id="economy" />
                <Label htmlFor="economy">Economy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface TravelerCounterProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

function TravelerCounter({
  label,
  sublabel,
  value,
  onChange,
  min,
  max,
}: TravelerCounterProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
        >
          <span className="sr-only">Decrease</span>
          <span className="text-lg">-</span>
        </Button>
        <span className="w-8 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
        >
          <span className="sr-only">Increase</span>
          <span className="text-lg">+</span>
        </Button>
      </div>
    </div>
  );
}