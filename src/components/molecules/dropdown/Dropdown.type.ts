export interface DropdownData {
  content: string
  subHeader?: string
}

export interface PropsDropdown {
  data?: DropdownData[]
  variant?: 'grouped' | 'default'
  inputValue: string
  content: string
}
