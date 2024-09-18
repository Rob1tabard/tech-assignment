import { useAtomValue, useSetAtom } from "jotai";

import { statusAtom, setStatusAtom } from "@/pages/Overview/atoms/statusAtom";

import { statusFilterOptions } from "@/lib/filters/statusFilterOptions";

//components
import { Select } from "@/components/Select";

export function SelectStatus() {
  const statusFilter = useAtomValue(statusAtom);
  const setStatusFilter = useSetAtom(setStatusAtom);

  return (
    <Select
      selected={statusFilter}
      setSelected={setStatusFilter}
      options={statusFilterOptions}
    />
  );
}
