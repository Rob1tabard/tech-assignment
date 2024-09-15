import dayjs from "dayjs";

//helpers
import { classNames } from "@/utils/helper/classNames";

//types
import type { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { TableWrapper } from "@/components/Table/Table.wrapper";
import { CheckInAction } from "@/components/Table/components/CheckInAction";
import { CheckOutAction } from "@/components/Table/components/CheckOutAction";
import { TableEmpty } from "@/components/Table/Table.empty";

type TableContent = { childrenData: ChildType[] };

export function TableContent({ childrenData }: TableContent) {
  if (!childrenData.length) {
    return <TableEmpty message="No children found" />;
  }

  return (
    <TableWrapper>
      {childrenData.map((child) => (
        <tr key={child.name.fullName}>
          <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div className="flex items-center gap-x-4">
              <span
                className={classNames("overflow-hidden rounded-full p-0.5", {
                  "bg-orange-400/15": !child.checkedIn,
                  "bg-green-400/15": child.checkedIn,
                })}
              >
                <img
                  alt={child.name.fullName}
                  src={child.image.small}
                  className="h-8 w-8 rounded-full bg-gray-100"
                />
              </span>
              <span className="truncate text-sm font-medium leading-6">
                {child.name.fullName}
              </span>
            </div>
          </td>
          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
              <div
                className={classNames(
                  {
                    "bg-green-400/15 text-green-400": child.checkedIn,
                    "bg-orange-400/15 text-orange-400": !child.checkedIn,
                  },
                  "flex-none rounded-full p-1",
                )}
                title={child.checkedIn ? "Checked in" : "Not checked in"}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              <div
                className={classNames(
                  "hidden rounded border px-1.5 py-0.5 text-xs sm:block",
                  {
                    "border-green-400 bg-green-400/15 text-green-400":
                      child.checkedIn,
                    "border-orange-400 bg-orange-400/15 text-orange-400":
                      !child.checkedIn,
                  },
                )}
              >
                {child.checkedIn ? "Checked in" : "Not checked in"}
              </div>
            </div>
          </td>
          <td className="hidden py-4 pr-8 sm:block">
            <div className="flex items-center gap-x-4">
              <span
                className={classNames("text-sm font-medium leading-6", {
                  hidden: !child.checkedIn,
                })}
              >
                {dayjs(child.checkins?.[0]?.pickupTime).format("D-MMM hh:mm A")}
              </span>
              <span
                className={classNames("text-sm font-medium leading-6", {
                  hidden: child.checkedIn,
                })}
              >
                No pickup time available
              </span>
            </div>
          </td>
          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
              <CheckOutAction child={child} />
              <CheckInAction child={child} />
            </div>
          </td>
        </tr>
      ))}
    </TableWrapper>
  );
}
