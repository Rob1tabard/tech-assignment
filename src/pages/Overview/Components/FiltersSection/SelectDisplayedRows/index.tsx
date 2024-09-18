import { useAtom } from "jotai";

import { displayedRowsAtom } from "@/pages/Overview/atoms/displayedRowsAtom";

import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";

//components
import { Select } from "@/components/Select";

export function SelectDisplayedRows() {
  const [displayedRows, setDisplayedRows] = useAtom(displayedRowsAtom);
  return (
    <Select
      selected={displayedRows}
      setSelected={setDisplayedRows}
      options={displayedRowsOptions}
    />
  );
}
