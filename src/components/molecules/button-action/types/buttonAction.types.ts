import { ButtonProps } from '@/components/atoms/button'

export type StatusVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info'

export interface ModalProps {
  isOpen: boolean
  variant: string
  title: string
  description: string
  positiveLabel: string
  negativeLabel: string
  onClose: () => void
  loading?: boolean
  onOk?: () => void
}

export interface RenderConfirmationContentProps {
  payload: any
  service: { mutateAsync: any; isPending: boolean }
  openConfirmation: boolean
  setOpenConfirmation: (open: boolean) => void
}

export type PropsButtonAction = ButtonProps & {
  payload: any
  text: string
  modalOptions: 'default' | 'dropdown' | 'remark' | 'custom'
  onClick?: (event: any) => void
  actionService?: (payload: any) => void
  rest?: any
  onSuccessAddition?: (data?: any, variables?: any) => void
  onErrorAddition?: any
  confirmationText?: ModalText
  confirmationStatusVariant: StatusVariant
  renderConfirmationContent?: (renderContent: RenderConfirmationContentProps) => React.ReactNode
  feedbackText?: ModalText
  alertText?: AlertText
  isValid?: boolean
}

export interface ModalText {
  title: string | React.ReactNode
  description: string | React.ReactNode
  positiveLabel: string
  negativeLabel: string
}

export interface AlertText {
  error: {
    title: string
    description: string
  }
  success: {
    title: string
    description: string
  }
}
