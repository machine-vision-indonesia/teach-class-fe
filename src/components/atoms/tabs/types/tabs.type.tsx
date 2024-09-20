import { ReactElement, ReactNode } from 'react'

export interface TypeTabsData {
  label: string
  renderContent: ReactNode
  renderIcon?: ReactElement
  disabled?: boolean
}

export interface PropsTabs {
  activeTabs: string
  onChange?: (val: string) => void
  data: TypeTabsData[]
  color?: 'info' | 'accent' | 'error' | 'warning' | 'success' | 'primary'
  centered?: boolean
  style?: 'line' | 'button'
  size?: 'small' | 'medium' | 'large'
  borderBottom?: boolean
}
