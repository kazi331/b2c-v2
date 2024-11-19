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
        className={`flex items-center justify-center gap-2 cursor-pointer rounded p-2 font-bold transition-colors duration-200 ${value === "oneWay" ? "text-gray-800" : "text-gray-600"}`}
      >
        <input
          type="radio"
          id="oneWay"
          name="tripType"
          value="oneWay"
          checked={value === "oneWay"}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
        />
        <span className={`size-4 rounded-full border-4 ${value === "oneWay" ? "border-brand" : "border-gray-300"}`}></span>
        One Way
      </Label>

      <Label
        htmlFor="roundTrip"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded p-2 font-bold transition-colors duration-200 ${value === "roundTrip" ? "text-gray-800" : "text-gray-600"}`}
      >
        <input
          type="radio"
          id="roundTrip"
          name="tripType"
          value="roundTrip"
          checked={value === "roundTrip"}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
        />
        <span className={`size-4 rounded-full border-4 ${value === "roundTrip" ? "border-brand" : "border-gray-300"}`}></span>
        Round Trip
      </Label>

      <Label
        htmlFor="multiCity"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded p-2 font-bold transition-colors duration-200 ${value === "multiCity" ? "text-gray-800" : "text-gray-600"}`}
      >
        <input
          type="radio"
          id="multiCity"
          name="tripType"
          value="multiCity"
          checked={value === "multiCity"}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
        />
        <span className={`size-4 rounded-full border-4 ${value === "multiCity" ? "border-brand" : "border-gray-300"}`}></span>
        Multi City
      </Label>
    </div>
  );
}
