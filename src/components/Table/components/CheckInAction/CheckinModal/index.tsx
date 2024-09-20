import { DialogTitle } from "@headlessui/react";
import { useState } from "react";

//type
import type { ChildType } from "@/utils/swr/useGetChildrenData/type";
import type { ErrorType } from "@/types/error.type";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";

//libs
import { POST_CHECK_IN_CHILD } from "@/lib/apiEndpoints";

//components
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

type CheckInModalProps = {
  child: ChildType;
  close: () => void;
  isOpen: boolean;
};

export function CheckInModal({ child, isOpen, close }: CheckInModalProps) {
  return (
    <Modal
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <CheckInModalContent child={child} close={close} />
    </Modal>
  );
}

type CheckInModalContentProps = Pick<CheckInModalProps, "child" | "close">;
function CheckInModalContent({ child, close }: CheckInModalContentProps) {
  const { mutateChildrenData } = useGetChildrenData();
  const [pickupTime, setPickupTime] = useState("");
  const [requestState, setRequestState] = useState({
    isLoading: false,
    error: "",
  });

  async function handleCheckIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setRequestState({ isLoading: true, error: "" });
      /*Formatted arams */
      const params = new URLSearchParams({
        accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
        pickupTime,
      }).toString();
      const response = await fetch(
        `${POST_CHECK_IN_CHILD.replace("<childId>", child.childId)}?${params}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw await response.json();
      }
      const responseData =
        (await response.json()) as ChildType["checkins"][number];

      /* Optimistic UI update the cached date with a revalidation in the background */
      mutateChildrenData((prev) => {
        if (!prev) return prev;
        return prev.map((childItem) => {
          if (childItem.childId !== child.childId) {
            return childItem;
          }
          return {
            ...childItem,
            checkedIn: true,
            checkins: [
              {
                childId: responseData.childId,
                pickupTime: responseData.pickupTime,
              },
              ...childItem.checkins,
            ],
          };
        });
      });
      close();
    } catch (e) {
      const error = e as ErrorType;
      setRequestState((prev) => ({
        ...prev,
        error: error.error,
      }));
    } finally {
      setRequestState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <>
      <DialogTitle as="h3" className="text-center text-xl font-semibold">
        Check in information
      </DialogTitle>
      <p className="mb-4 text-center text-sm italic">{`Please fill in check in information for ${child.name.fullName}`}</p>
      {requestState.error ? (
        <span className="text-xs italic text-red-500">
          {requestState.error}
        </span>
      ) : null}
      <form className="flex flex-col space-y-4" onSubmit={handleCheckIn}>
        <label
          className="block w-max text-sm font-semibold hover:cursor-pointer"
          htmlFor="pickup-time"
        >
          Pickup time*
        </label>
        <input
          id="pickup-time"
          disabled={requestState.isLoading}
          value={pickupTime}
          className="block rounded border p-1 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1"
          name="pickup-time"
          type="time"
          onChange={(e) => setPickupTime(e.target.value)}
        />
        <Button
          className="rounded bg-blue-500 p-2 text-base text-white"
          disabled={!pickupTime || requestState.isLoading}
          isLoading={requestState.isLoading}
        >
          <span>Confirm check in</span>
        </Button>
      </form>
    </>
  );
}
