import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CitySelect } from "./CitySelect";
import { DatePicker } from "./DatePicker";

interface Flight {
  origin: string;
  destination: string;
  date: Date | undefined;
}

interface MultiCityTripProps {
  flights: Flight[];
  onFlightChange: (index: number, flight: Flight) => void;
  onAddFlight: () => void;
  onRemoveFlight: (index: number) => void;
}

export function MultiCityTrip({
  flights,
  onFlightChange,
  onAddFlight,
  onRemoveFlight,
}: MultiCityTripProps) {
  return (
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <div key={index} className="flex items-center">
          <div className="flex gap-2 flex-1 me-2">
            <CitySelect
              value={flight.origin}
              onChange={(value) =>
                onFlightChange(index, { ...flight, origin: value })
              }
              placeholder="From"
              excludeCity={flight.destination}
              className=""
            />
            <CitySelect
              value={flight.destination}
              onChange={(value) =>
                onFlightChange(index, { ...flight, destination: value })
              }
              placeholder="To"
              excludeCity={flight.origin}
              className=""
            />

            <DatePicker
              date={flight.date}
              onChange={(date) => onFlightChange(index, { ...flight, date })}
              label="Select date"
            />
          </div>
          {flights.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFlight(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="outline"
        onClick={onAddFlight}
        className="w-full"
        disabled={flights.length >= 5}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add another flight
      </Button>
    </div>
  );
}
