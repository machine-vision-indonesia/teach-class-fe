import { StatusPrefix } from './prefix'

export enum DeliveryPlanStatus {
  OPEN = `${StatusPrefix.DELIVERY_PLAN} Open`,
  SCM_APPROVED = `${StatusPrefix.DELIVERY_PLAN} SCM Approved`,
  PRODUCTION_APPROVED = `${StatusPrefix.DELIVERY_PLAN} Production Approved`,
  DELIVERY_APPROVED = `${StatusPrefix.DELIVERY_PLAN} Delivery Approved`,
  INQUIRY_RECONFIRM = `${StatusPrefix.DELIVERY_PLAN} Inquiry Re-confirm`,
  INQUIRY_CONFIRMED = `${StatusPrefix.DELIVERY_PLAN} Inquiry Confirmed`,
  DELIVERY_SCHEDULED = `${StatusPrefix.DELIVERY_PLAN} Delivery Scheduled`
}
