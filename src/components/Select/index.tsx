import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/helper/classNames";

type BaseOption = { value: string | number; label: string };

type SelectProps<T> = {
  selected: T;
  setSelected: (value: T) => void;
  options: readonly T[];
};
export function Select<T extends BaseOption>({
  selected,
  setSelected,
  options,
}: SelectProps<T>) {
  return (
    <div className="w-52 text-black">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={classNames([
            "relative block w-full rounded-md bg-gray-50 py-1.5 pl-3 pr-8 text-left text-sm/6",
            "hover:cursor-pointer focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-500",
          ])}
        >
          {selected.label}
          <ChevronDownIcon
            className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={classNames([
            "mt-1 w-[var(--button-width)] rounded-md border border-gray-300 bg-gray-50 p-1 focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          ])}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 hover:cursor-pointer data-[focus]:bg-gray-200/35"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6">{option.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
