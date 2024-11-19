"use client";

import { CitySelect } from "@/components/FlightBooking/CitySelect";
import { DatePicker } from "@/components/FlightBooking/DatePicker";
import { DatePickerWithRange } from "@/components/FlightBooking/DatePickerRange";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchBtn from "./SearchBtn";
import SwapBtn from "./SwapBtn";
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
  const handleMulticitySwapCities = (index: number) => {
    const newFlights = [...multiCityFlights];
    newFlights[index] = {
      ...newFlights[index],
      origin: newFlights[index].destination,
      destination: newFlights[index].origin,
    };
    setMultiCityFlights(newFlights);
  };

  const handleMultiCityFlightChange = (index: number, flight: Flight) => {
    const newFlights = [...multiCityFlights];
    newFlights[index] = flight;
    setMultiCityFlights(newFlights);
  };

  const handleAddFlight = () => {
    if (multiCityFlights.length < 5) {
      const lastFlight = multiCityFlights[multiCityFlights.length - 1];
      const newDate = lastFlight?.date
        ? addDays(lastFlight?.date, 1)
        : tomorrow;

      setMultiCityFlights([
        ...multiCityFlights,
        {
          origin: lastFlight?.destination || "",
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
          <SwapBtn handleSwapCities={handleSwapCities} />
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

      {/* multi city trip section */}

      {tripType === "multiCity" && (
        <>
          {multiCityFlights.map((flight, index) => (
            <div key={index} className="grid gap-4 grid-cols-12">
              <div className="relative gap-2 col-span-5">
                <div className="grid grid-flow-col grid-cols-2 gap-2 w-full">
                  <CitySelect
                    value={flight.origin}
                    onChange={(value) =>
                      handleMultiCityFlightChange(index, {
                        ...flight,
                        origin: value,
                      })
                    }
                    placeholder="From"
                    excludeCity={flight.destination}
                    label="From"
                  />
                  <CitySelect
                    value={flight.destination}
                    onChange={(value) =>
                      handleMultiCityFlightChange(index, {
                        ...flight,
                        destination: value,
                      })
                    }
                    placeholder="To"
                    excludeCity={flight.origin}
                    label="To"
                  />
                </div>
                <SwapBtn
                  handleSwapCities={() => handleMulticitySwapCities(index)}
                />
              </div>
              <DatePicker
                className="col-span-4"
                date={multiCityFlights[multiCityFlights.length - 1].date}
                onChange={(date) =>
                  handleMultiCityFlightChange(multiCityFlights.length - 1, {
                    ...multiCityFlights[multiCityFlights.length - 1],
                    date,
                  })
                }
                label="Departure Date"
                minDate={today}
              />
              <div className="col-span-3 flex items-center justify-center bg-brand text-white rounded-lg">
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveFlight(index)}
                  className="ml-2 hover:bg-transparent hover:text-white h-full w-full text-3xl "
                >
                  &minus;
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleAddFlight()}
                  className="ml-2 hover:bg-transparent hover:text-white h-full w-full text-3xl"
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
      {/* add flight button */}
      {tripType === "multiCity" &&
        multiCityFlights.length < 5 &&
        multiCityFlights.length < 1 && (
          <Button
            variant="outline"
            onClick={handleAddFlight}
            className="ml-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add another flight
          </Button>
        )}
      {/* search button */}
      <SearchBtn handleSearch={handleSearch} label="Flight" />
    </div>
  );
}
