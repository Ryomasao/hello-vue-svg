export const SHAPE_TYPE = {
  RECTANGLE: 'RECTANGLE',
  FOO: 'FOO'
} as const

export type ShapeType = keyof typeof SHAPE_TYPE
