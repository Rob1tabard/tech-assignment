export function splitArray<T>(array: T[], length: number) {
  if (!array?.length) {
    return [];
  }

  const chunks: Array<T[]> = [];

  for (let i = 0; i < array.length; i += length) {
    chunks.push(array.slice(i, i + length));
  }

  return chunks;
}
