import { useAtom } from "jotai";
import { dequal } from "dequal";

//atoms
import { childrenAtom } from "@/pages/Overview/atoms/childrenAtom";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";

//components
import {
  TableContent,
  TableEmpty,
  TableError,
  TableLoading,
} from "@/pages/Overview/Components/Table";
import { Paginate } from "@/pages/Overview/Components/Table/components/Paginate";
import { FiltersSection } from "@/pages/Overview/Components/FiltersSection";

export function OverviewContent() {
  const { childrenData, isLoading, childrenDataError } = useGetChildrenData();
  const [children, setChildren] = useAtom(childrenAtom);

  if (isLoading) return <TableLoading />;

  if (childrenDataError) return <TableError />;

  if (!childrenData?.length) return <TableEmpty />;

  if (!dequal(children, childrenData)) {
    setChildren(childrenData);
  }

  return (
    <div className="flex flex-col space-y-4">
      <FiltersSection />
      <div className="flex flex-col space-y-2">
        <TableContent />
        <Paginate />
      </div>
    </div>
  );
}
