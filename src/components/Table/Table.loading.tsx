//utils
import { classNames } from "@/utils/helper/classNames";

//components
import { TableWrapper } from "@/components/Table/Table.wrapper";

export function TableLoading() {
  return (
    <TableWrapper>
      {[...Array(10)].map((_, index) => (
        <tr key={index} className="py-8">
          {[...Array(2)].map((_, index) => (
            <td
              key={index}
              className={classNames("w-full px-2 py-4", {
                "flex items-center gap-2 ": index === 0,
              })}
            >
              <span
                className={classNames(
                  "w-8 h-8 rounded-full bg-gray-300 animate-pulse",
                  { hidden: index !== 0 }
                )}
              />
              <span className="block w-1/3 h-3 rounded animate-pulse bg-gray-300" />
            </td>
          ))}
        </tr>
      ))}
    </TableWrapper>
  );
}
