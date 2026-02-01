export const calculateSelectedFiltersCount = (filters: Record<string, string | string[] | [number, number]>) => {
  return Object.values(filters).reduce((acc, filter) => {
    if (Array.isArray(filter)) return acc + filter.length

    return acc + 1
  }, 0)
}
