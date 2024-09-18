import { atom } from "jotai";

export const cursorAtom = atom(0);

export const resetCursorAtom = atom(null, (_get, set) => {
  set(cursorAtom, 0);
});
