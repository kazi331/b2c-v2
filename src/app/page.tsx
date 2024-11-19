"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
// import { FlightBooking } from "@/components/FlightBooking/FlightBooking"
import { FlightBooking } from "@/components/FlightBooking/FlightSearch";
import {
  Building2,
  CreditCard,
  TreePalmIcon as PalmTree,
  Plane,
} from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-5xl mx-auto bg-white p-4 pb-10 pt-14 rounded-lg shadow relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-1/2 grid-cols-4 p-1 bg-white absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 px-10 shadow h-min">
            <TabsTrigger
              value="flight"
              className="flex items-center gap-1 py-3 rounded-none !shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=active]:border-brand"
            >
              <Plane className="h-4 w-4" />
              Flight
            </TabsTrigger>
            <TabsTrigger
              value="hotel"
              className="flex items-center gap-1 py-3 rounded-none !shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=active]:border-brand"
            >
              <Building2 className="h-4 w-4" />
              Hotel
            </TabsTrigger>
            <TabsTrigger
              value="tour"
              className="flex items-center gap-1 py-3 rounded-none !shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=active]:border-brand"
            >
              <PalmTree className="h-4 w-4" />
              Tour
            </TabsTrigger>
            <TabsTrigger
              value="visa"
              className="flex items-center gap-1 py-3 rounded-none !shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=active]:border-brand"
            >
              <CreditCard className="h-4 w-4" />
              Visa
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flight">
            <FlightBooking />
          </TabsContent>
          <TabsContent value="hotel">
            <div className="p-4 text-center">Hotel booking coming soon</div>
          </TabsContent>
          <TabsContent value="tour">
            <div className="p-4 text-center">Tour booking coming soon</div>
          </TabsContent>
          <TabsContent value="visa">
            <div className="p-4 text-center">Visa services coming soon</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
