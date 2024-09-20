import { ReactNode } from 'react'

export interface PropsCardTabs {
  variant?: 'outlined' | 'elevation'
  width?: string
  renderThumbnail?: ReactNode
  renderAction?: ReactNode
  activeSelected?: boolean
  title: string
  description?: string
  onClick?: () => void
}
