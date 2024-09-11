import { useState } from "react";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";
import { getItemsToDisplay } from "@/utils/helper/getItemsToDisplay";

//lib
import { pageItemsNumber } from "@/lib/paginateConfig/pageItemsNumber";

//components
import {
  TableContent,
  TableEmpty,
  TableError,
  TableLoading,
} from "@/components/Table";
import { Paginate } from "@/components/Paginate";

export function OverviewContent() {
  const { childrenData, isLoading, childrenDataError } = useGetChildrenData();
  const [cursor, setCursor] = useState(0);

  if (isLoading) return <TableLoading />;

  if (childrenDataError) return <TableError />;

  if (!childrenData?.length) return <TableEmpty />;

  const displayedData = getItemsToDisplay(
    childrenData,
    cursor,
    pageItemsNumber
  );
  return (
    <div className="flex flex-col space-y-2 items-end">
      <TableContent childrenData={displayedData} />
      <Paginate cursor={cursor} setCursor={setCursor} />
    </div>
  );
}
