import { UseQueryResult } from '@tanstack/react-query'
import { FetchParameters } from '../table-async/TableAsync.type'

export interface PropsExportExcel {
  content: string
  subHeader?: string
}

export interface PropsExportExcel {
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { count: any }
  }>
  content: string
}
