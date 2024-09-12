type TableWrapperProps = {
  children: React.ReactNode;
};

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="w-full overflow-x-scroll rounded-md border border-gray-300 bg-gray-50/50">
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-gray-70000/10 border-b text-sm leading-6">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Pickup Time
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="relative divide-y divide-gray-700/5">
          {children}
        </tbody>
      </table>
    </div>
  );
}
