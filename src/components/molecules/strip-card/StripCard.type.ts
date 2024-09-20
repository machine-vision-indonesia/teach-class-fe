import { ReactNode } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'

export interface PropsStripCard {
  color?: ThemeColor
  accent?: 'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal'
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
}
