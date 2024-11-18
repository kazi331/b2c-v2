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
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-2 px-4 transition-colors duration-200 ${value === "oneWay" ? "bg-brand text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
        <span className={`size-4 rounded-full border-2 ${value === "oneWay" ? "border-white" : "border-gray-300"}`}></span>
        One Way
      </Label>

      <Label
        htmlFor="roundTrip"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-2 px-4 transition-colors duration-200 ${value === "roundTrip" ? "bg-brand text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
        <span className={`size-4 rounded-full border-2 ${value === "roundTrip" ? "border-white" : "border-gray-300"}`}></span>
        Round Trip
      </Label>

      <Label
        htmlFor="multiCity"
        className={`flex items-center justify-center gap-2 cursor-pointer rounded py-2 px-4 transition-colors duration-200 ${value === "multiCity" ? "bg-brand text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
        <span className={`size-4 rounded-full border-2 ${value === "multiCity" ? "border-white" : "border-gray-300"}`}></span>
        Multi City
      </Label>
    </div>
  );
}
