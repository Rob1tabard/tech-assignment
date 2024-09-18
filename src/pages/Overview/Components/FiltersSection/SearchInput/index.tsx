import { useAtomValue, useSetAtom } from "jotai";

import { searchAtom, setSearchAtom } from "@/pages/Overview/atoms/searchAtom";

export function SearchInput() {
  const inputValue = useAtomValue(searchAtom);
  const setInputValue = useSetAtom(setSearchAtom);

  return (
    <input
      className="w-64 rounded-md border border-gray-300 p-1.5 focus:outline-none"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
