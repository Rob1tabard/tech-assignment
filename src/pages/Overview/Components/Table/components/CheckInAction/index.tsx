import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { CheckInModal } from "@/pages/Overview/Components/Table/components/CheckInAction/CheckInModal";
import { classNames } from "@/utils/helper/classNames";

type CheckInActionProps = {
  child: ChildType;
};
export function CheckInAction({ child }: CheckInActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={classNames(
          "flex w-24 items-center justify-center space-x-1 rounded bg-blue-400 p-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-offset-1",
          { hidden: child.checkedIn },
        )}
      >
        <PencilSquareIcon className="inline-block h-3.5 w-3.5" />
        <span>Check-in</span>
      </button>
      <CheckInModal child={child} isOpen={isOpen} close={close} />
    </>
  );
}
