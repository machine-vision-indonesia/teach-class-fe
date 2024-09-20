import { UseQueryResult } from '@tanstack/react-query'
import {
  fetchParameters,
  GetDeliveryPlanStatus
} from '../../clusters/delivery-plan/pages/list-delivery-plan/services/fetch/fetchDeliveryPlanStatus.service'

export interface IKanbanAsyncStatus {
  id?: string | any
  name?: string | any
  code?: string | any
  color?: any
  update?: any
  action?: any
}
export interface IKanbanCardAsyncItem {
  title: string | any
  value: string | any
}
export interface IKanbanCardAsyncData {
  id: string | any
  title: string | any
  subTitle: string | any
  contentTitle?: string | any
  contentItems: IKanbanCardAsyncItem[]
  dateFrom?: Date
  dateTo?: Date
  singleDateData?: Date
  status: IKanbanAsyncStatus
}

export interface KanbanProps {
  statusOrder?: string[] | any[] | any
  onClick?: (item: IKanbanCardAsyncData) => void | any
  dataFetchService: () => UseQueryResult<{
    data: IKanbanCardAsyncData[] | any[] | any
  }>
  kanbanStatusFetchService: (params: fetchParameters) => UseQueryResult<GetDeliveryPlanStatus>
}
export interface IGroupedKanbanAsyncData {
  status: string
  items: IKanbanCardAsyncData[]
}
