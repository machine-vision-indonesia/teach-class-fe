export interface ViewModalProps {
  id: string | number
  setId: React.Dispatch<React.SetStateAction<string | number | null>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: any
}
