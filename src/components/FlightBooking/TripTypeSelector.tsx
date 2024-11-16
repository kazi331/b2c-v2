import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TripTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TripTypeSelector({ value, onChange }: TripTypeSelectorProps) {
  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onChange}
      className="flex space-x-4 mb-6"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="oneWay" id="oneWay" />
        <Label htmlFor="oneWay">One Way</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="roundTrip" id="roundTrip" />
        <Label htmlFor="roundTrip">Round Trip</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="multiCity" id="multiCity" />
        <Label htmlFor="multiCity">Multi City</Label>
      </div>
    </RadioGroup>
  );
}