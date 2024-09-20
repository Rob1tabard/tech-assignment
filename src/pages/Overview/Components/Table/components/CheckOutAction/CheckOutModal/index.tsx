import { DialogTitle } from "@headlessui/react";
import { useState } from "react";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";
import { ErrorType } from "@/types/error.type";

//libs
import { POST_CHECKOUT_CHILD } from "@/lib/apiEndpoints";

//utils
import { useGetChildrenData } from "@/utils/swr/useGetChildrenData";

//components
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

type CheckOutModalProps = {
  child: ChildType;
  close: () => void;
  isOpen: boolean;
};

export function CheckOutModal({ child, isOpen, close }: CheckOutModalProps) {
  return (
    <Modal
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <CheckOutModalContent child={child} close={close} />
    </Modal>
  );
}

function CheckOutModalContent({
  child,
  close,
}: Pick<CheckOutModalProps, "child" | "close">) {
  const { mutateChildrenData } = useGetChildrenData();
  const [requestState, setRequestState] = useState({
    isLoading: false,
    error: "",
  });

  async function handleCheckOut() {
    try {
      setRequestState({ isLoading: true, error: "" });
      /* Formatted params */
      const params = new URLSearchParams({
        accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
      }).toString();
      const response = await fetch(
        `${POST_CHECKOUT_CHILD.replace("<childId>", child.childId)}?${params}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw await response.json();
      }
      /* Optimistic UI update the cached date with a revalidation in the background */
      mutateChildrenData((prev) => {
        if (!prev) return prev;
        return prev.map((childItem) => {
          if (childItem.childId !== child.childId) {
            return childItem;
          }
          return {
            ...childItem,
            checkedIn: false,
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
        Checkout
      </DialogTitle>
      <p className="mb-4 text-center text-sm italic">{`Are you sure that you want to checkout ${child.name.fullName}`}</p>
      {requestState.error ? (
        <span className="text-xs italic text-red-500">
          {requestState.error}
        </span>
      ) : null}
      <Button
        className="w-full rounded bg-blue-500 p-2 text-base text-white"
        disabled={requestState.isLoading}
        onClick={handleCheckOut}
        isLoading={requestState.isLoading}
      >
        <span>Confirm checkout</span>
      </Button>
    </>
  );
}
