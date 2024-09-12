//components
import { TableWrapper } from "@/components/Table/Table.wrapper";

export function TableError() {
  return (
    <TableWrapper>
      <tr className="block min-h-80">
        <div className="absolute inset-0 flex min-h-80 w-full items-center justify-center text-red-500">
          <span className="text-sm italic">
            An error occurred while fetching your data. Please try again
          </span>
        </div>
      </tr>
    </TableWrapper>
  );
}
