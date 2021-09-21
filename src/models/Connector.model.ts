export const CONNECTOR_TYPE = {
  POLYLINE: 'POLYLINE'
} as const

export type ConnectorType = keyof typeof CONNECTOR_TYPE
