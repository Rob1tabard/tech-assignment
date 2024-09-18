//components
import { SelectDisplayedRows } from "@/pages/Overview/Components/FiltersSection/SelectDisplayedRows";
import { SelectStatus } from "@/pages/Overview/Components/FiltersSection/SelectStatus";
import { SearchInput } from "@/pages/Overview/Components/FiltersSection/SearchInput";

export function FiltersSection() {
  return (
    <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
      <SearchInput />
      <SelectDisplayedRows />
      <SelectStatus />
    </div>
  );
}
