interface IDisabledChild {
  [key: string]: boolean
}

export interface IDetailSalesOrder {
  value?: any
  disabledAll?: boolean
  onChange?: (value: any) => void
  disabledChilds?: string[]
  isDetail: boolean
}
