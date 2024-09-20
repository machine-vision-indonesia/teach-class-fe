import { StatusPrefix } from './prefix'

export enum InventoryTransferRequestStatus {
  SCHEDULED = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Scheduled`,
  TRANSPORT_READY = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Transport Ready`,
  READY_FOR_STUFFING = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Ready for Stuffing`,
  READY_FOR_DELIVERY = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Ready for Delivery`,
  CONFIRM = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Confirm`,
  ON_DELIVERY = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} On Delivery`,
  DELIVERED = `${StatusPrefix.INVENTORY_TRANSFER_REQUEST} Delivered`
}
