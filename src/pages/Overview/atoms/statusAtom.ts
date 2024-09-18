import { atom } from "jotai";
import { statusFilterOptions } from "@/lib/filters/statusFilterOptions";

import { resetCursorAtom } from "@/pages/Overview/atoms/cursorAtom";

type StatusAtomType = (typeof statusFilterOptions)[number];
export const statusAtom = atom<StatusAtomType>(statusFilterOptions[0]);

export const setStatusAtom = atom(
  null,
  (_get, set, newValue: StatusAtomType) => {
    set(statusAtom, newValue);
    set(resetCursorAtom);
  },
);
