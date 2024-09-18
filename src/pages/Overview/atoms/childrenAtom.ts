import { atom } from "jotai";
import { matchSorter } from "match-sorter";

//utils
import { getItemsToDisplay } from "@/utils/helper/getItemsToDisplay";

//atom
import { searchAtom } from "@/pages/Overview/atoms/searchAtom";
import { statusAtom } from "@/pages/Overview/atoms/statusAtom";
import { cursorAtom } from "@/pages/Overview/atoms/cursorAtom";
import { displayedRowsAtom } from "@/pages/Overview/atoms/displayedRowsAtom";

//type
import type { ChildrenDataType } from "@/utils/swr/useGetChildrenData/type";

export const childrenAtom = atom<ChildrenDataType>([]);

export const filteredChildrenDataAtom = atom((get) => {
  const children = get(childrenAtom);
  const search = get(searchAtom);
  const status = get(statusAtom);
  let filteredChildren = children;

  if (status.value === "checked_in") {
    filteredChildren = filteredChildren.filter((child) => child.checkedIn);
  }

  if (status.value === "checkout") {
    filteredChildren = filteredChildren.filter((child) => !child.checkedIn);
  }

  if (search.trim()) {
    filteredChildren = matchSorter(filteredChildren, search.toLowerCase(), {
      keys: ["name.fullName"],
    });
  }

  return filteredChildren;
});

export const displayedChildrenDataAtom = atom((get) => {
  const filteredData = get(filteredChildrenDataAtom);
  const cursor = get(cursorAtom);
  const displayedRows = get(displayedRowsAtom);

  return getItemsToDisplay(filteredData, cursor, displayedRows.value);
});
