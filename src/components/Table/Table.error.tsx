//components
import { TableWrapper } from "@/components/Table/Table.wrapper";

export function TableError() {
  return (
    <TableWrapper>
      <tr className="min-h-80 block">
        <div className="absolute inset-0 min-h-80 flex items-center justify-center text-red-500 w-full">
          <span className="text-sm italic">
            An error occurred while fetching your data. Please try again
          </span>
        </div>
      </tr>
    </TableWrapper>
  );
}
