export enum SalesOrderStatus {
  OPEN = 'Open',
  CLOSE = 'Close',
  SHIP = 'Ship',
  CONFIRMED = 'SO Confirmed'
}

export interface IButtonMenuProps {
  activeData: ISalesOrder
}

export interface ISalesOrder {
  id: string
  code: string
  so_number: string
  delivery_date: Date
  customer: string
  total_material: number
  total_dp: number
  progress: number
  status: SalesOrderStatus
}
