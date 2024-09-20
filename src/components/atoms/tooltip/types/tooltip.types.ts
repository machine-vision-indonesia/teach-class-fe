import { ReactNode } from 'react'

export interface PropsTooltip {
  id: string
  renderContent: ReactNode
  variant: 'bottom' | 'left' | 'right' | 'top'
  style?: 'basic' | 'arrow'
  size?: 'small' | 'medium' | 'large'
}

export interface OptionTooltip {
  width: number
  height: number
  positionValue: number
}
