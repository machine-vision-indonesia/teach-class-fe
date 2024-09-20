interface IOption {
  [key: string]: any
  disabled?: boolean
}

export interface ChecklistRequestProps {
  title?: string
  options: IOption[]
  disabled?: boolean
  labelKey?: string
  valueKey?: string
  value?: IOption[]
  onChange?: (value: any) => void
  bordered?: boolean
  padded?: boolean
}

export interface ICheckboxValues {
  [key: string]: IOption[]
}
