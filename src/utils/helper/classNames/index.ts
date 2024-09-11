import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//types
import type { ClassValue } from "clsx";

export function classNames(...args: Array<ClassValue | undefined>) {
  return twMerge(clsx(args));
}
