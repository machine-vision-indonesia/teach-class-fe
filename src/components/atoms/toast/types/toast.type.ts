import { ReactNode } from 'react'

export interface PropsToast {
  content?: ReactNode | string
  title: string
  subTitle: string
  type?: 'information' | 'alert'
  variant: 'danger' | 'success'
  size?: 'small' | 'large'
  icon: string
  iconColor?: string
  onClose?: () => void
}
