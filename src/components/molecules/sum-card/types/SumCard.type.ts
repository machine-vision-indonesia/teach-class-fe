import { ReactNode } from 'react'

export interface PropsSumCard {
  style?: 'elevation' | 'outlined'
  variant?: 'left' | 'right'
  title?: string
  totalNumber?: number
  statusLabel?: string
  description?: string
  icon?: ReactNode
  backgroundIconColor?: string
}
