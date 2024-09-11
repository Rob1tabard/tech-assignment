import { TableWrapper } from "@/components/Table/Table.wrapper";

export function TableEmpty() {
  return (
    <TableWrapper>
      <tr className="min-h-80 block">
        <div className="absolute inset-0 min-h-80 flex items-center justify-center w-full">
          <span className="text-sm italic">
            There isn't any children registered at the moment
          </span>
        </div>
      </tr>
    </TableWrapper>
  );
}
