import { useState } from "react";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { CheckOutModal } from "@/components/Table/components/CheckOut/CheckOutModal";

type CheckOutProps = {
  child: ChildType;
};
export function CheckOut({ child }: CheckOutProps) {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="focus:outline-none focus:ring-1 focus:ring-orange-300 focus:ring-offset-1 rounded bg-orange-400 text-white p-1 text-xs"
      >
        Check-Out
      </button>
      <CheckOutModal child={child} isOpen={isOpen} close={close} />
    </>
  );
}
