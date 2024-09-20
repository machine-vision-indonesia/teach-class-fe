import { UseQueryResult } from '@tanstack/react-query'

export interface DropdownMultipleFilterProps {
  valueKey: string
  valueLabel: string
  placeholder: string
  paramFilter?: any
  valueDropdown: any[]
  dataFetchService: (params: any) => UseQueryResult<{ data: any[] }>
  onChange: (event: React.SyntheticEvent) => void
}
