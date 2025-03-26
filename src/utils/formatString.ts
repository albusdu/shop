export const formatSlugToTitle = (str: string): string => {
  if (!str) return ''
  return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export const normalizeError = (err: unknown): Error => {
  return err instanceof Error ? err : new Error('An unknown error occurred')
}
