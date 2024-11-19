import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function FlightSearchFilter() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-brand scale-110"
            id="umrah"
          />
          <Label htmlFor="umrah" className="cursor-pointer w-full text-[1rem]">
            Umrah
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-brand scale-110"
            id="student"
            defaultChecked
          />
          <Label
            htmlFor="student"
            className="cursor-pointer w-full text-[1rem]"
          >
            Student
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-brand scale-110"
            id="direct-flight"
            defaultChecked
          />
          <Label
            htmlFor="direct-flight"
            className="cursor-pointer w-full text-[1rem]"
          >
            Direct Flight
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-brand scale-110"
            id="one-stop"
          />
          <Label
            htmlFor="one-stop"
            className="cursor-pointer w-full text-[1rem]"
          >
            One Stop Flight
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            className="data-[state=checked]:bg-brand scale-110"
            id="advance"
            defaultChecked
          />
          <Label
            htmlFor="advance"
            className="cursor-pointer w-full text-[1rem]"
          >
            Advance search
          </Label>
        </div>
      </div>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Air Line" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="emirates">Emirates</SelectItem>
          <SelectItem value="qatar">Qatar Airways</SelectItem>
          <SelectItem value="etihad">Etihad Airways</SelectItem>
          <SelectItem value="turkish">Turkish Airlines</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
