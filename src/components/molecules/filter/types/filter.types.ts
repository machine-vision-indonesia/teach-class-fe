import { DataViewControllerType, FilterType } from '../constants'
import { IFilterResult } from './filterResult.types'

interface IOptions {
  [key: string | number]: any
  label?: string
  icon?: string
}

export interface IResultController {
  key: string
  name: string
  type: FilterType
  options?: IOptions[]
  dataFetchService?: any
  valueKey?: string
  labelKey?: string
  placeholder?: string
}

export interface IDataViewController {
  key: string
  name: string
  type: DataViewControllerType
  options?: IOptions[]
  dataFetchService?: any
  valueKey?: string
  labelKey?: string
  placeholder?: string
}

export interface IFilter {
  type?: 'inline' | 'sidebar' | 'card-group'
  resultController?: IResultController[]
  dataViewController?: IDataViewController[]
  onChange?: (param: IFilterResult) => void
}
