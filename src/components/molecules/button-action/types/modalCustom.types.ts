export interface RenderModalCustomProps {
  submitForm: (data: any) => void
  onClose: () => void
  isLoading: boolean
}

export interface IModalCustom {
  isOpen: boolean
  modalTitle?: string
  onClose: () => void
  renderModal: (renderModalCustomProps: RenderModalCustomProps) => React.ReactNode
  onSubmit?: (data: any) => void
  isLoading?: boolean
}
