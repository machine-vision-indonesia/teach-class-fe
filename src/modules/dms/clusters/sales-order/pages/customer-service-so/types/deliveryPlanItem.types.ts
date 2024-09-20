interface IDeliveryType {
  id: string
  label: string
}

export interface IDeliveryPlanItem {
  id: string | number
  dp_number: string
  delivery_type: IDeliveryType | undefined
  delivery_date_request: string | Date | null
  //   type: string
  //   quantity: number
  //   unit: string
  //   delivery_quantity: number
}
