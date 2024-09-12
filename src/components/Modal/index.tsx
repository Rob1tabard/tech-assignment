import { Dialog, DialogPanel } from "@headlessui/react";

type ModalProps = React.ComponentProps<typeof Dialog>;
export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/20 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
