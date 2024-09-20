import { ConfirmationStatus } from "../../modal"

export interface IModalRemark {
  isOpen: boolean
  modalTitle?: string
  modalDescription?: string
  confirmationStatus?: ConfirmationStatus
  onClose: () => void
  onSubmit?: (remark: string) => void
  isLoading?: boolean
}

export interface IFormData {
  remark: string
}
