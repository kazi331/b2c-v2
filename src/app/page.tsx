"use client"
import { useState } from "react";
import { ArrowLeftRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TripTypeSelector } from "@/components/FlightBooking/TripTypeSelector";
import { CitySelect } from "@/components/FlightBooking/CitySelect";
import { DatePicker } from "@/components/FlightBooking/DatePicker";
import { MultiCityTrip } from "@/components/FlightBooking/MultiCityTrip";
import { TravelersClassSelect } from "@/components/FlightBooking/TravelersClassSelect";
import { addDays } from "date-fns";

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

export default function Page() {
  // Set default values
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  const [tripType, setTripType] = useState("roundTrip");
  const [origin, setOrigin] = useState("DAC");
  const [destination, setDestination] = useState("CXB");
  const [departureDate, setDepartureDate] = useState<Date>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date>(dayAfterTomorrow);
  const [travelers, setTravelers] = useState<Travelers>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState("Economy");
  const [multiCityFlights, setMultiCityFlights] = useState<Flight[]>([
    { 
      origin: "DAC", 
      destination: "CXB", 
      date: tomorrow 
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
          date: newDate 
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
            departureDate,
            ...(tripType === "roundTrip" && { returnDate }),
          }
        : {
            flights: multiCityFlights,
          }),
    };
    console.log("Search data:", searchData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Flight Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <TripTypeSelector value={tripType} onChange={setTripType} />
              </div>
              <div className="sm:w-72">
                <TravelersClassSelect
                  travelers={travelers}
                  onTravelersChange={setTravelers}
                  cabinClass={cabinClass}
                  onCabinClassChange={setCabinClass}
                />
              </div>
            </div>

            {tripType !== "multiCity" ? (
              <>
                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-start">
                  <CitySelect
                    value={origin}
                    onChange={setOrigin}
                    placeholder="From"
                    excludeCity={destination}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwapCities}
                    className="mt-1"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                  <CitySelect
                    value={destination}
                    onChange={setDestination}
                    placeholder="To"
                    excludeCity={origin}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DatePicker
                    date={departureDate}
                    onChange={(date) => setDepartureDate(date || tomorrow)}
                    label="Departure Date"
                    minDate={today}
                  />
                  {tripType === "roundTrip" && (
                    <DatePicker
                      date={returnDate}
                      onChange={(date) => setReturnDate(date || dayAfterTomorrow)}
                      label="Return Date"
                      minDate={departureDate}
                    />
                  )}
                </div>
              </>
            ) : (
              <MultiCityTrip
                flights={multiCityFlights}
                onFlightChange={handleMultiCityFlightChange}
                onAddFlight={handleAddFlight}
                onRemoveFlight={handleRemoveFlight}
              />
            )}

            <Button onClick={handleSearch} className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
