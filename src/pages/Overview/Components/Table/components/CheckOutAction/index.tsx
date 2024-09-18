import { useState } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { CheckOutModal } from "@/pages/Overview/Components/Table/components/CheckOutAction/CheckOutModal";
import { classNames } from "@/utils/helper/classNames";

type CheckOutProps = {
  child: ChildType;
};
export function CheckOutAction({ child }: CheckOutProps) {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={classNames(
          "flex w-24 items-center justify-center space-x-1 rounded bg-orange-400 p-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-300 focus:ring-offset-1",
          { hidden: !child.checkedIn },
        )}
      >
        <ArrowRightStartOnRectangleIcon className="inline-block h-3.5 w-3.5" />
        <span>Check-Out</span>
      </button>
      <CheckOutModal child={child} isOpen={isOpen} close={close} />
    </>
  );
}
