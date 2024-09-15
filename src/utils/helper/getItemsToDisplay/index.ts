import { matchSorter } from "match-sorter";

export function getItemsToDisplay<T>(
  data: T[],
  cursor: number,
  pageItemsNumber: number,
  filteredInput: string,
): T[] {
  let filteredData = data;
  if (filteredInput) {
    filteredData = matchSorter(data, filteredInput.toLowerCase(), {
      keys: ["name.fullName"],
    });
  }
  if (cursor === 0) {
    return filteredData.slice(0, pageItemsNumber);
  }

  if (cursor === 1) {
    return filteredData.slice(pageItemsNumber, pageItemsNumber * 2);
  }

  return filteredData.slice(
    pageItemsNumber * cursor,
    pageItemsNumber * (cursor + 1),
  );
}
