"use client";

import { CitySelect } from "@/components/FlightBooking/CitySelect";
import { DatePicker } from "@/components/FlightBooking/DatePicker";
import { DatePickerWithRange } from "@/components/FlightBooking/DatePickerRange";
import { MultiCityTrip } from "@/components/FlightBooking/MultiCityTrip";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { ArrowLeftRight, Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TravelersClassSelect } from "./TravelersClassSelect";

interface Flight {
  origin: string;
  destination: string;
  date: Date | undefined;
}

interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

export default function FlightSearch({ tripType }: { tripType: string }) {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  const [origin, setOrigin] = useState("ZYZ");
  const [destination, setDestination] = useState("ZYI");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: tomorrow,
    to: dayAfterTomorrow,
  });
  const [departureDate, setDepartureDate] = useState<Date>(tomorrow);
  const [travelers, setTravelers] = useState<Travelers>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState("Economy");
  const [multiCityFlights, setMultiCityFlights] = useState<Flight[]>([
    {
      origin: "ZYZ",
      destination: "ZYI",
      date: tomorrow,
    },
  ]);

  const handleSwapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleMultiCityFlightChange = (index: number, flight: Flight) => {
    const newFlights = [...multiCityFlights];
    newFlights[index] = flight;
    setMultiCityFlights(newFlights);
  };

  const handleAddFlight = () => {
    if (multiCityFlights.length < 5) {
      const lastFlight = multiCityFlights[multiCityFlights.length - 1];
      const newDate = lastFlight.date ? addDays(lastFlight.date, 1) : tomorrow;

      setMultiCityFlights([
        ...multiCityFlights,
        {
          origin: lastFlight.destination || "",
          destination: "",
          date: newDate,
        },
      ]);
    }
  };

  const handleRemoveFlight = (index: number) => {
    const newFlights = multiCityFlights.filter((_, i) => i !== index);
    setMultiCityFlights(newFlights);
  };

  const handleSearch = () => {
    const searchData = {
      tripType,
      travelers,
      cabinClass,
      ...(tripType !== "multiCity"
        ? {
            origin,
            destination,
            ...(tripType === "roundTrip" ? { dateRange } : { departureDate }),
          }
        : {
            flights: multiCityFlights,
          }),
    };
    console.log("Search data:", searchData);
  };

  return (
    <div className="space-y-4 bg-white">
      {tripType !== "multiCity" ? (
        <div className="grid gap-4 grid-cols-12">
          {/* city select section */}
          <div className="relative gap-2 col-span-5">
            <div className="grid grid-flow-col grid-cols-2 gap-2 w-full">
              <CitySelect
                value={origin}
                onChange={setOrigin}
                placeholder="From"
                excludeCity={destination}
                label="From"
              />
              <CitySelect
                value={destination}
                onChange={setDestination}
                placeholder="To"
                excludeCity={origin}
                label="To"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapCities}
              className="flex items-center bg-brand text-white hover:bg-brand hover:text-white rounded-full border-4 border-white justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* date picker section */}
          {tripType === "roundTrip" ? (
            <DatePickerWithRange
              className="col-span-4"
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          ) : (
            <DatePicker
              className="col-span-4"
              date={departureDate}
              onChange={(date) => setDepartureDate(date as Date)}
              label="Departure Date"
              minDate={today}
            />
          )}
          <TravelersClassSelect
            className="col-span-3"
            travelers={travelers}
            onTravelersChange={setTravelers}
            cabinClass={cabinClass}
            onCabinClassChange={setCabinClass}
          />
        </div>
      ) : (
        <MultiCityTrip
          flights={multiCityFlights}
          onFlightChange={handleMultiCityFlightChange}
          onAddFlight={handleAddFlight}
          onRemoveFlight={handleRemoveFlight}
        />
      )}

      <Button
        onClick={handleSearch}
        className="bg-brand text-white hover:bg-brand hover:text-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-bold text-xl py-5"
      >
        <Search className="mr-1 h-4 w-4" />
        Search Flight
      </Button>
    </div>
  );
}
