export function sortFilterValues<T extends Record<string, any[]>>(
  filters: T
): T {
  let result: T = {} as T;
  Object.entries(filters).forEach(([key, value]) => {
    result = {
      ...result,
      [key]: value.sort((a, b) => String(a).localeCompare(String(b))),
    };
  });
  return result;
}
