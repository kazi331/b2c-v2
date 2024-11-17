import { Label } from "@/components/ui/label";

interface TripTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TripTypeSelector({ value, onChange }: TripTypeSelectorProps) {
  return (
    <div className="flex space-x-2 mb-6">
      <Label
        htmlFor="oneWay"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-3 px-4 ${value === "oneWay" ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-500"}`}
      >
        <input
          type="radio"
          id="oneWay"
          name="tripType"
          value="oneWay"
          checked={value === "oneWay"}
          onChange={(e) => onChange(e.target.value)}
          // className="w-4 h-4"
          className={`w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-white ${value === "oneWay" ? "" : ""}`}
        />
        One Way
      </Label>

      <Label
        htmlFor="roundTrip"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-3 px-4 ${value === "roundTrip" ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-500"}`}
      >
        <input
          type="radio"
          id="roundTrip"
          name="tripType"
          value="roundTrip"
          checked={value === "roundTrip"}
          onChange={(e) => onChange(e.target.value)}
         className={`w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-white ${value === "roundTrip" ? "" : ""}`}
        />
        Round Trip
      </Label>

      <Label
        htmlFor="multiCity"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-3 px-4 ${value === "multiCity" ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-500"}`}
      >
        <input
          type="radio"
          id="multiCity"
          name="tripType"
          value="multiCity"
          checked={value === "multiCity"}
          onChange={(e) => onChange(e.target.value)}
         className={`w-4 h-4 rounded-full text-blue-600 bg-gray-100 border-gray-300 focus:ring-white ${value === "multiCity" ? "" : ""}`}
        />
        Multi City
      </Label>
    </div>
  );
}
