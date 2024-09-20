import { ReactNode } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'

export type BaseModalType = 'default' | 'feedback' | 'confirmation'

export type DefaultStatus = never
export type FeedbackStatus = 'success' | 'danger' | 'warning'
export type ConfirmationStatus = 'primary' | 'danger' | 'warning'

type ModalStatus<T extends BaseModalType> = T extends 'feedback'
  ? FeedbackStatus
  : T extends 'confirmation'
  ? ConfirmationStatus
  : DefaultStatus

export interface BaseModalProps<T extends BaseModalType = 'default'> {
  isOpen: boolean
  onClose?: () => void
  onOk?: () => void
  positiveLabel?: string
  negativeLabel?: string
  title?: string
  description?: string | ReactNode
  position?: 'center' | 'left'
  color?: ThemeColor
  closeable?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  renderAction?: boolean
  scroll?: 'paper' | 'body'
  loading?: boolean
  children?: any
  positionActionButton?: 'right' | 'center'
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'feedback' | 'confirmation'
  status?: ModalStatus<T>
}

export type DefaultModalProps = BaseModalProps<'default'>
export type FeedbackModalProps = BaseModalProps<'feedback'>
export type ConfirmationModalProps = BaseModalProps<'confirmation'>
