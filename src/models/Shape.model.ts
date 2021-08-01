export const SHAPE_TYPE = {
  RECTANGLE: 'RECTANGLE',
  CIRCLE: 'CIRCLE',
  FOO: 'FOO'
} as const

export type ShapeType = keyof typeof SHAPE_TYPE
