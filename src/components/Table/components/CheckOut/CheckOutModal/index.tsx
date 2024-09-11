import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//libs
import { POST_CHECKOUT_CHILD } from "@/lib/apiEndpoints";

type CheckOutModalProps = {
  child: ChildType;
  close: () => void;
  isOpen: boolean;
};

export function CheckOutModal({ child, isOpen, close }: CheckOutModalProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <CheckOutModalContent child={child} />
    </Dialog>
  );
}

function CheckOutModalContent({ child }: Pick<CheckOutModalProps, "child">) {
  const [requestState, setRequestState] = useState({
    isLoading: false,
    error: "",
  });

  async function handleCheckOut() {
    try {
      setRequestState({ isLoading: true, error: "" });
      const response = await fetch(
        POST_CHECKOUT_CHILD.replace("<childId>", child.childId),
        {
          method: "POST",
          body: JSON.stringify({
            accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
          }),
        }
      );
      if (!response.ok) {
        throw await response.json();
      }
      // mutate swr hook to the data shown to the user
    } catch (e) {
      console.error(e);
      setRequestState((prev) => ({
        ...prev,
        error:
          "An error occurred while processing your request please try again",
      }));
    } finally {
      setRequestState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/20 backdrop-blur-sm ">
      <div className="flex min-h-full items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-xl font-semibold text-center">
            Checkout
          </DialogTitle>
          <p className="italic text-sm text-center mb-4">{`Are you sure that you want to checkout ${child.name.fullName}`}</p>
          {requestState.error ? (
            <span className="text-red-500 text-xs italic">
              {requestState.error}
            </span>
          ) : null}
          <button
            className="bg-blue-500 rounded px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleCheckOut}
          >
            Confirm Checkout
          </button>
        </DialogPanel>
      </div>
    </div>
  );
}
