import { atom } from "jotai";

import { resetCursorAtom } from "@/pages/Overview/atoms/cursorAtom";

export const searchAtom = atom("");

export const setSearchAtom = atom(null, (_get, set, newValue: string) => {
  set(searchAtom, newValue);
  set(resetCursorAtom);
});
