/** Функция которая принимает объект квери параметров url, и возвращает подготовленную строку */
export const buildQueryString = (params: Record<string, string | string[] | undefined>): string => {
  const query = new URLSearchParams()

  for (const key in params) {
    const value = params[key]

    if (value === undefined) continue

    if (Array.isArray(value)) {
      value.forEach((v) => {
        query.append(key, v)
      })
    } else {
      query.append(key, value)
    }
  }

  const queryString = query.toString()

  return queryString ? `?${queryString}` : ""
}
