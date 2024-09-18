//utils
import { classNames } from "@/utils/helper/classNames";

//components
import { TableWrapper } from "@/pages/Overview/Components/Table/Table.wrapper";

export function TableLoading() {
  return (
    <TableWrapper>
      {[...Array(10)].map((_, index) => (
        <tr key={index} className="py-8">
          {[...Array(2)].map((_, index) => (
            <td
              key={index}
              className={classNames("w-full px-2 py-4", {
                "flex items-center gap-2": index === 0,
              })}
            >
              <span
                className={classNames(
                  "h-8 w-8 animate-pulse rounded-full bg-gray-300",
                  { hidden: index !== 0 },
                )}
              />
              <span className="block h-3 w-1/3 animate-pulse rounded bg-gray-300" />
            </td>
          ))}
        </tr>
      ))}
    </TableWrapper>
  );
}
