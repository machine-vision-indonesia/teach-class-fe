import { RequestBodyVehicle } from '../services/action/actionVehicle.service'

export type VehicleModalType = 'add-vehicle' | 'edit-vehicle' | 'delete-vehicle' | null

export interface IVehicleModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<VehicleModalType>>
  onClose: () => void
  modalType?: VehicleModalType
  modalData?: RequestBodyVehicle
  onDelete?: (id: string) => void
  onSubmit?: (data: any) => void
}
