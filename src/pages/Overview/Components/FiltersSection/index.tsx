//lib
import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";
import { statusFilterOptions } from "@/lib/filters/statusFilterOptions";

//components
import { Select } from "@/components/Select";

type FiltersSectionProps = {
  rowsFilter: {
    displayedRows: (typeof displayedRowsOptions)[number];
    setDisplayedRows: React.Dispatch<
      React.SetStateAction<(typeof displayedRowsOptions)[number]>
    >;
  };
  statusFilter: {
    statusFilter: (typeof statusFilterOptions)[number];
    setStatusFilter: React.Dispatch<
      React.SetStateAction<(typeof statusFilterOptions)[number]>
    >;
  };
  inputFilter: {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
  };
};

export function FiltersSection({
  rowsFilter,
  statusFilter,
  inputFilter,
}: FiltersSectionProps) {
  return (
    <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
      <input
        className="w-64 rounded-md border border-gray-300 p-1.5 focus:outline-none"
        value={inputFilter.inputValue}
        onChange={(e) => inputFilter.setInputValue(e.target.value)}
      />
      <Select
        selected={rowsFilter.displayedRows}
        setSelected={rowsFilter.setDisplayedRows}
        options={displayedRowsOptions}
      />
      <Select
        selected={statusFilter.statusFilter}
        setSelected={statusFilter.setStatusFilter}
        options={statusFilterOptions}
      />
    </div>
  );
}
