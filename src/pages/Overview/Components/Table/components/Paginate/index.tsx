import { useAtom, useAtomValue } from "jotai";
// import { useEffect } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/16/solid";

//atom
import { filteredChildrenDataAtom } from "@/pages/Overview/atoms/childrenAtom";
import { cursorAtom } from "@/pages/Overview/atoms/cursorAtom";
import { displayedRowsAtom } from "@/pages/Overview/atoms/displayedRowsAtom";

//lib
import { classNames } from "@/utils/helper/classNames";

export function Paginate() {
  const data = useAtomValue(filteredChildrenDataAtom);
  const displayedRows = useAtomValue(displayedRowsAtom);
  const [cursor, setCursor] = useAtom(cursorAtom);

  const pages = Math.ceil(data?.length / displayedRows.value);

  // if there are no pages, return null
  if (!pages) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <div className="flex w-max gap-2 rounded border border-gray-300 p-2 text-sm font-medium text-gray-500">
        <button
          onClick={() => setCursor(0)}
          disabled={cursor === 0}
          className="disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCursor((prev) => prev - 1)}
          disabled={cursor === 0}
          className="disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {[...Array(pages)].map((_, index) => (
          <button
            key={index}
            className={classNames("px-1", {
              "font-bold text-black": cursor === index,
            })}
            type="button"
            onClick={() => setCursor(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCursor((prev) => prev + 1)}
          disabled={cursor === pages - 1}
          className="disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCursor(pages - 1)}
          disabled={cursor === pages - 1}
          className="disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
