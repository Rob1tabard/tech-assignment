import { atom } from "jotai";
import { displayedRowsOptions } from "@/lib/filters/displayedRowsOptions";

type DisplayedRowsType = (typeof displayedRowsOptions)[number];

export const displayedRowsAtom = atom<DisplayedRowsType>(
  displayedRowsOptions[0],
);
