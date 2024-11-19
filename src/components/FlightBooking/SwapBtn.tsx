import { ArrowLeftRight } from "lucide-react";
import { Button } from "../ui/button";

export default function SwapBtn({
  handleSwapCities,
}: {
  handleSwapCities: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSwapCities}
      className="flex items-center bg-brand text-white hover:bg-brand hover:text-white rounded-full border-4 border-white justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <ArrowLeftRight className="h-4 w-4" />
    </Button>
  );
}
