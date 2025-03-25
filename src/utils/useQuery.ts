type QueryObject = Record<string, string | number | boolean | undefined>

export const getQueryString = <T extends QueryObject>(queryObj: T): string => {
  const params = new URLSearchParams()
  Object.entries(queryObj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })
  return params.toString() ? `?${params.toString()}` : ''
}
