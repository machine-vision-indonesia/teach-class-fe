export interface EditModalProps {
  id?: string | number
  setId?: React.Dispatch<React.SetStateAction<string | number | null>>
  data?: any
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
}
