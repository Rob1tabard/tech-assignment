type TableWrapperProps = {
  children: React.ReactNode;
};

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="w-full bg-gray-50 border border-gray-300 rounded-md">
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-gray-70000/10 text-sm leading-6 ">
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
              Checked in
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/5 relative">
          {children}
        </tbody>
      </table>
    </div>
  );
}
