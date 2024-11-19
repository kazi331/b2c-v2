import { Label } from "@/components/ui/label";

type TripType = "oneWay" | "roundTrip" | "multiCity";

interface TripTypeSelectorProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

const TripTypeOption = ({ id, value, checked, onChange, label }: { 
  id: TripType; 
  value: TripType; 
  checked: boolean; 
  onChange: (value: TripType) => void; 
  label: string; 
}) => (
  <Label
    htmlFor={id}
    className={`flex items-center justify-center gap-2 cursor-pointer rounded p-2 font-bold transition-colors duration-200 ${
      checked ? "text-gray-800" : "text-gray-600"
    }`}
  >
    <input
      type="radio"
      id={id}
      name="tripType"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="hidden"
    />
    <span
      className={`size-4 rounded-full border-[0.35rem] ${
        checked ? "border-brand" : "border-gray-300"
      }`}
    ></span>
    {label}
  </Label>
);

export function TripTypeSelector({ value, onChange }: TripTypeSelectorProps) {
  return (
    <div className="flex space-x-2 mb-6">
      <TripTypeOption id="oneWay" value="oneWay" checked={value === "oneWay"} onChange={onChange} label="One Way" />
      <TripTypeOption id="roundTrip" value="roundTrip" checked={value === "roundTrip"} onChange={onChange} label="Round Trip" />
      <TripTypeOption id="multiCity" value="multiCity" checked={value === "multiCity"} onChange={onChange} label="Multi City" />
    </div>
  );
}
