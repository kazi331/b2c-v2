import { Search } from "lucide-react";
import { Button } from "../ui/button";

export default function SearchBtn({
  handleSearch,
  label = "Flight",
}: {
  handleSearch: () => void;
  label: string;
}) {
  return (
    <Button
      onClick={handleSearch}
      className="bg-brand text-white hover:bg-brand hover:text-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-bold text-xl py-5"
    >
      <Search className="mr-1 h-4 w-4" />
      Search {label}
    </Button>
  );
}
