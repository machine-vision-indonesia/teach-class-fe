export interface ReconfirmModalProps {
  deliveryPlanId: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
}
