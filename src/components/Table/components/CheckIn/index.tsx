import { useState } from "react";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//components
import { CheckInModal } from "@/components/Table/components/CheckIn/CheckInModal";

type CheckInProps = {
  child: ChildType;
};
export function CheckIn({ child }: CheckInProps) {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-offset-1 rounded bg-blue-400 text-white p-1 text-xs"
      >
        Check-in
      </button>
      <CheckInModal child={child} isOpen={isOpen} close={close} />
    </>
  );
}
