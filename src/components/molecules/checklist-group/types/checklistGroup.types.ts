import { ChecklistRequestProps } from '../../checklist-request/types/checklistRequest.types'

interface IOption {
  [key: string]: any
}

export interface IChecklistGroupValues {
  [key: string]: IOption[]
}

export interface ChecklistGroupProps {
  title: string
  checklistRequests: React.ReactElement<ChecklistRequestProps>[]
  onChange?: (value: IChecklistGroupValues) => void
  disabled?: boolean
}
