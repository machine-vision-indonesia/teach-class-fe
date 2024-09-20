import { ReactNode } from 'react'

export interface TypeHistoricalData {
  child?: ReactNode
  date: Date | string
  title: string
  subTitle?: string
  state?: 'success' | 'failed' | 'default'
  profile?: {
    avatar?: string
    name?: string
    position?: string
  }
}

export interface PropsHistorical {
  data: TypeHistoricalData[]
  color?: ColorHistorical
  width?: number
  type?: 'left' | 'right' | 'middle'
  size?: 'small' | 'medium'
}

export interface TimeLineItem {
  title: string
  subTitle: string
  profile?: {
    name?: string
    position?: string
  }
}

export type ColorHistorical = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'
