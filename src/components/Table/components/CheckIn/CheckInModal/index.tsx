import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

//type
import { ChildType } from "@/utils/swr/useGetChildrenData/type";

//libs
import { POST_CHECKIN_CHILD } from "@/lib/apiEndpoints";

type indexProps = { child: ChildType; close: () => void; isOpen: boolean };

export function CheckInModal({ child, isOpen, close }: indexProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/20 backdrop-blur-sm ">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-xl font-semibold text-center">
              Checkin informations
            </DialogTitle>
            <p className="italic text-sm text-center mb-4">{`Please fill in checkin informations for ${child.name.fullName}`}</p>
            <CheckInModalContent childId={child.childId} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

type CheckInModalContentProps = { childId: ChildType["childId"] };
function CheckInModalContent({ childId }: CheckInModalContentProps) {
  const [pickupTime, setPickupTime] = useState("");
  const [requestState, setRequestState] = useState({
    isLoading: false,
    error: "",
  });

  async function handleCheckin() {
    try {
      setRequestState({ isLoading: true, error: "" });
      const response = await fetch(
        POST_CHECKIN_CHILD.replace("<childId>", childId),
        {
          method: "POST",
          body: JSON.stringify({
            accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
            pickupTime,
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
    <>
      {requestState.error ? (
        <span className="text-red-500 text-xs italic">
          {requestState.error}
        </span>
      ) : null}
      <div className="flex flex-col space-y-4">
        <label className="block text-sm font-semibold" htmlFor="pickup-time">
          Pickup time*
        </label>

        <input
          id="pickup-time"
          disabled={requestState.isLoading}
          value={pickupTime}
          className="mt-1 block border rounded p-1"
          name="pickup-time"
          type="time"
          onChange={(e) => setPickupTime(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!pickupTime || requestState.isLoading}
          onClick={handleCheckin}
        >
          Confirm checkin
        </button>
      </div>
    </>
  );
}
