import path from 'path-browserify'

export const resolvePath = (...pathSegments: string[]): string => {
  return path.resolve(...pathSegments)
}