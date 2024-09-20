import * as yup from 'yup'

export type ColorVariant = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
export type StatusVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info'

export interface RenderContentProps {
  formControl: any
}

export interface ModalDialogProps {
  isOpen: boolean
  onClose?: () => void
  onOk?: (value: any) => void
  positiveLabel?: string
  negativeLabel?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  position?: 'center' | 'left'
  closeable?: boolean
  icon?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  renderAction?: boolean
  scroll?: 'paper' | 'body'
  loading?: boolean
  children?: any
  positionActionButton?: 'right' | 'center'
  size?: 'small' | 'medium' | 'large'
  typeVariant?: 'confirmation' | 'feedback'
  statusVariant?: StatusVariant
  renderContent?: (renderContent: RenderContentProps) => React.ReactNode
  contentValidationSchema?: yup.ObjectSchema<any>
}
