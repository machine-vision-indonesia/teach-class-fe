import { ReactNode } from 'react'
import { PropsAvatar } from '../../avatar/Avatar'

export default interface ComponentDropdownProps {
  label: string
  type?: 'select' | 'more'
  size?: 'small' | 'medium' | 'large'
  menu?: {
    content: string | ReactNode
    onClick?: (index: number) => void
    disabled?: boolean
    icon?: string
  }[]
  content?: ReactNode
  menuWidth?: string | number
  menuMinWidth?: string | number
  icon?: string
  variant?: 'contained' | 'outlined'
  color?: PropsAvatar['badgeColor']
  disabled?: boolean
}
