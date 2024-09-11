export function getItemsToDisplay<T>(
  data: T[],
  cursor: number,
  pageItemsNumber: number
): T[] {
  if (cursor === 0) {
    return data.slice(0, pageItemsNumber);
  }

  if (cursor === 1) {
    return data.slice(pageItemsNumber, pageItemsNumber * 2);
  }

  return data.slice(pageItemsNumber * cursor, pageItemsNumber * (cursor + 1));
}
