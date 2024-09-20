export interface IModalDropdown {
  isOpen: boolean
  modalTitle?: string
  modalInstruction?: string
  onClose: () => void
  onSubmit?: (dropdownKey: string) => void
  isLoading?: boolean
  dropdownList: any[]
  dropdownKey: string
  dropdownLabel: string
  modalTrueLabel?: string
  modalFalseLabel?: string
}

export interface IDropdownData {
  item: string
}
