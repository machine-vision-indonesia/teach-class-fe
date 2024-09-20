export interface EditModalProps {
  modalType: 'ADD' | 'EDIT'
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | false>>
  onClose: () => void
}
