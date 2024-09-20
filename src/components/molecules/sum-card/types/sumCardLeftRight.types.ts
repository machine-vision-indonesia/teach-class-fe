import { ReactNode } from 'react'

export interface ISumLeftProps {
  icon: ReactNode
  statusLabel?: string
  total?: number
  backgroundIconColor?: string
}
export interface ISumRightProps {
  icon: ReactNode
  title?: string
  description?: string
  total?: number
  backgroundIconColor?: string
}
