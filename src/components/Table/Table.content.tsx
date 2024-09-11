//helpers
import { classNames } from "@/utils/helper/classNames";

//types
import type { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { TableWrapper } from "@/components/Table/Table.wrapper";
import { CheckIn } from "@/components/Table/components/CheckIn";
import { CheckOut } from "@/components/Table/components/CheckOut";

type TableContent = { childrenData: ChildType[] };

export function TableContent({ childrenData }: TableContent) {
  return (
    <TableWrapper>
      {childrenData.map((child) => (
        <tr key={child.name.fullName}>
          <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div className="flex items-center gap-x-4">
              <span className="rounded-full overflow-hidden bg-blue-500/20 p-0.5">
                <img
                  alt=""
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
                    "text-green-400 bg-green-400/15": child.checkedIn,
                    "text-orange-400 bg-orange-400/15": !child.checkedIn,
                  },
                  "flex-none rounded-full p-1"
                )}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              <div
                className={classNames(
                  "px-1.5 py-0.5 rounded text-xs border hidden sm:block",
                  {
                    "text-green-400 border-green-400 bg-green-400/15":
                      child.checkedIn,
                    "text-orange-400 border-orange-400 bg-orange-400/15":
                      !child.checkedIn,
                  }
                )}
              >
                {child.checkedIn ? "Checked in" : "Not checked in"}
              </div>
            </div>
          </td>
          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
              {child.checkedIn ? (
                <CheckOut child={child} />
              ) : (
                <CheckIn child={child} />
              )}
            </div>
          </td>
        </tr>
      ))}
    </TableWrapper>
  );
}
