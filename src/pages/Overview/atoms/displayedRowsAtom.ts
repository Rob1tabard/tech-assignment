import { atom } from "jotai";
import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";

import { cursorAtom, resetCursorAtom } from "@/pages/Overview/atoms/cursorAtom";
import { filteredChildrenDataAtom } from "@/pages/Overview/atoms/childrenAtom";

type DisplayedRowsType = (typeof displayedRowsOptions)[number];

export const displayedRowsAtom = atom<DisplayedRowsType>(
  displayedRowsOptions[0],
);

export const setDisplayedRowsAtom = atom(
  null,
  (get, set, newValue: DisplayedRowsType) => {
    set(displayedRowsAtom, newValue);
    const pages = get(pagesAtom);
    const cursor = get(cursorAtom);

    if (cursor + 1 > pages) {
      set(resetCursorAtom);
    }
  },
);

export const pagesAtom = atom<number>((get) => {
  const data = get(filteredChildrenDataAtom);
  const displayedRows = get(displayedRowsAtom);

  return Math.ceil(data?.length / displayedRows.value);
});
