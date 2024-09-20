export interface FormModalProps {
  id?: string
  setId: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  actionType: 'CREATE' | 'UPDATE' | string
}
