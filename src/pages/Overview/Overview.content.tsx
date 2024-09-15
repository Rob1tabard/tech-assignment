import { useState, useEffect, useDeferredValue } from "react";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";
import { getItemsToDisplay } from "@/utils/helper/getItemsToDisplay";

//lib
import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";
import { statusFilterOptions } from "@/lib/filters/statusFilterOptions";

//components
import {
  TableContent,
  TableEmpty,
  TableError,
  TableLoading,
} from "@/components/Table";
import { Paginate } from "@/components/Table/components/Paginate";
import { FiltersSection } from "@/pages/Overview/Components/FiltersSection";

export function OverviewContent() {
  const { childrenData, isLoading, childrenDataError } = useGetChildrenData();
  const [filteredData, setFilteredData] = useState(childrenData ?? []);
  const [cursor, setCursor] = useState(0);

  /* input value and it's deferred state */
  const [inputValue, setInputValue] = useState("");
  const deferredInputValue = useDeferredValue(inputValue);

  /* State for row selection */
  const [displayedRows, setDisplayedRows] = useState<
    (typeof displayedRowsOptions)[number]
  >(displayedRowsOptions[0]);

  /* state for status selection */
  const [statusFilter, setStatusFilter] = useState<
    (typeof statusFilterOptions)[number]
  >(statusFilterOptions[0]);

  /* reset filtered data to children data after a change eg: mutation after check in or checkout */
  useEffect(() => {
    if (childrenData) {
      setFilteredData(childrenData);
    }
  }, [childrenData]);

  /* update filteredData based on status selected in filterStatus */
  useEffect(() => {
    if (!childrenData) return;
    if (statusFilter.value === "all") {
      setFilteredData(childrenData);
      return;
    }
    if (statusFilter.value === "checked_in") {
      const checkedInChildren = childrenData.filter((child) => child.checkedIn);
      setFilteredData(checkedInChildren);
      return;
    }
    const checkedOutChildren = childrenData.filter((child) => !child.checkedIn);
    setFilteredData(checkedOutChildren);
  }, [statusFilter, childrenData]);

  /* Reset cursor to zero when filters changes */
  useEffect(() => {
    setCursor(0);
  }, [displayedRows, statusFilter, deferredInputValue]);

  if (isLoading) return <TableLoading />;

  if (childrenDataError) return <TableError />;

  if (!childrenData?.length) return <TableEmpty />;

  /* get data to display based on cursor, rows to display per page and filtered input */
  const displayedData = getItemsToDisplay(
    filteredData,
    cursor,
    displayedRows.value,
    deferredInputValue,
  );

  return (
    <div className="flex flex-col space-y-4">
      <FiltersSection
        rowsFilter={{ displayedRows, setDisplayedRows }}
        statusFilter={{ statusFilter, setStatusFilter }}
        inputFilter={{ inputValue, setInputValue }}
      />
      <div className="flex flex-col space-y-2">
        <TableContent childrenData={displayedData} />
        <Paginate
          data={deferredInputValue.trim() ? displayedData : filteredData}
          cursor={cursor}
          setCursor={setCursor}
          displayedRows={displayedRows.value}
        />
      </div>
    </div>
  );
}
