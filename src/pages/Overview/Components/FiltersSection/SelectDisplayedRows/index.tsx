import { useAtomValue, useSetAtom } from "jotai";

import {
  displayedRowsAtom,
  setDisplayedRowsAtom,
} from "@/pages/Overview/atoms/displayedRowsAtom";

import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";

//components
import { Select } from "@/components/Select";

export function SelectDisplayedRows() {
  const displayedRows = useAtomValue(displayedRowsAtom);
  const setDisplayedRows = useSetAtom(setDisplayedRowsAtom);
  return (
    <Select
      selected={displayedRows}
      setSelected={setDisplayedRows}
      options={displayedRowsOptions}
    />
  );
}
