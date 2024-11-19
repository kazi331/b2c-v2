"use client";

import { useState } from "react";
// import { FlightBooking } from "@/components/FlightBooking/FlightBooking"
import FlightSearch from "@/components/FlightBooking/FlightSearch";
import { TripTypeSelector } from "@/components/FlightBooking/TripTypeSelector";
import { Button } from "@/components/ui/button";
import { Building2, Send } from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("flight");
  const [tripType, setTripType] = useState("roundTrip");
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto bg-white p-4 pb-10 pt-14 rounded-lg shadow relative">
        <div className="flex items-center justify-between mb-2">
          {/* tab selector */}
          <div className="flex items-center gap-1 ">
            <Button
              variant="ghost"
              className={`text-xl py-6 px-4 ${
                activeTab === "flight" &&
                "bg-brand text-white hover:bg-brand hover:text-white"
              }`}
              onClick={() => setActiveTab("flight")}
            >
              <Send className="size-4" /> Flight
            </Button>
            <Button
              variant="ghost"
              className={`text-xl py-6 px-4 ${
                activeTab === "hotel" &&
                "bg-brand text-white hover:bg-brand hover:text-white"
              }`}
              onClick={() => setActiveTab("hotel")}
            >
              <Building2 className="size-4" /> Hotel
            </Button>
          </div>
          {/* trip type selector */}
          {activeTab === "flight" && (
            <TripTypeSelector value={tripType} onChange={setTripType} />
          )}
        </div>
          {/* flight search */}
        {activeTab === "flight" && <FlightSearch tripType={tripType} />}
      </div>
    </div>
  );
}
