export function getItemsToDisplay<T>(
  data: T[],
  cursor: number,
  pageItemsNumber: number,
): T[] {
  return data.slice(pageItemsNumber * cursor, pageItemsNumber * (cursor + 1));
}
