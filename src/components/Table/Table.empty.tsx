import { TableWrapper } from "@/components/Table/Table.wrapper";

export function TableEmpty() {
  return (
    <TableWrapper>
      <tr className="block min-h-80">
        <td>
          <div className="absolute inset-0 flex min-h-80 w-full items-center justify-center">
            <span className="text-sm italic">
              There isn't any children registered at the moment
            </span>
          </div>
        </td>
      </tr>
    </TableWrapper>
  );
}
