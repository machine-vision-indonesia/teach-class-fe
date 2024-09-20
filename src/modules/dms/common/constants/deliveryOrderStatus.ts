import { StatusPrefix } from './prefix'

export enum DeliveryOrderStatus {
  OPEN = `${StatusPrefix.DELIVERY_ORDER} Open`,
  READY_FOR_DELIVERY = `${StatusPrefix.DELIVERY_ORDER} Ready for Delivery`,
  ON_GOING_STUFFING = `${StatusPrefix.DELIVERY_ORDER} On Going Stuffing`,
  ON_DELIVERY = `${StatusPrefix.DELIVERY_ORDER} On Delivery`,
  DELIVERED = `${StatusPrefix.DELIVERY_ORDER} Delivered`
}
