export const formatSlugToTitle = (str: string): string => {
  if (!str) return ''
  return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}
