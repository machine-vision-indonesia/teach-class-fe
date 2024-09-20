import { lazy } from 'react'

const MDStatus = lazy(() => import('./clusters/master-data/pages/md-status'))
const MDCategoryChecklist = lazy(() => import('./clusters/master-data/pages/md-category-checklist'))
const MDChecklist = lazy(() => import('./clusters/master-data/pages/md-checklist'))
const MDMaterialUnit = lazy(() => import('./clusters/master-data/pages/md-material-unit'))
const MDVehicle = lazy(() => import('./clusters/master-data/pages/md-vehicle'))
const MDShift = lazy(() => import('./clusters/master-data/pages/md-shift'))
const MDShiftDetail = lazy(() => import('./clusters/master-data/pages/md-shift/detail'))
const ListSalesOrder = lazy(() => import('./clusters/sales-order/pages/list-so'))

const AddSalesOrder = lazy(() => import('./clusters/sales-order/pages/customer-service-so/AddSalesOrder'))
const EditSalesOrder = lazy(() => import('./clusters/sales-order/pages/customer-service-so/EditSalesOrder'))
const DetailSalesOrder = lazy(() => import('./clusters/sales-order/pages/customer-service-so/DetailSalesOrder'))
const ListDeliveryPlan = lazy(() => import('./clusters/delivery-plan/pages/list-delivery-plan'))
const DetailDeliveryPlan = lazy(() => import('./clusters/delivery-plan/pages/detail-delivery-plan/DetailDeliveryPlan'))
const DetailDeliveryOrder = lazy(
  () => import('./clusters/delivery-plan/pages/detail-delivery-order/DetailDeliveryOrder')
)
const EditDeliveryPlan = lazy(
  () => import('./clusters/delivery-plan/pages/customer-service-delivery-plan/EditDeliveryPlan')
)

/**
 * Inventory Transfer
 */
const ListInventoryTransfer = lazy(() => import('./clusters/inventory-transfer/pages/list-inventory-transfer'))
const CreateFormInventoryTransfer = lazy(() => import('./clusters/inventory-transfer/pages/supply-chain/CreateForm'))
const CreateEditManualInventoryTransfer = lazy(
  () => import('./clusters/inventory-transfer/pages/supply-chain/CreateEditManual')
)
const DetailDelivery = lazy(() => import('@/modules/dms/clusters/inventory-transfer/pages/delivery'))

const zes1dmsRoutes = [
  {
    path: 'sales-order',
    children: [
      {
        path: 'add',
        element: <AddSalesOrder />
      },
      {
        path: 'edit/:id',
        element: <EditSalesOrder />
      },
      {
        path: 'detail/:id',
        element: <DetailSalesOrder isDetail={false} />
      }
    ]
  },
  {
    path: 'master-data',
    children: [
      {
        path: 'status',
        element: <MDStatus />
      },
      {
        path: 'category-checklist',
        element: <MDCategoryChecklist />
      },
      {
        path: 'checklist',
        element: <MDChecklist />
      },
      {
        path: 'material-unit',
        element: <MDMaterialUnit />
      },
      {
        path: 'vehicle',
        element: <MDVehicle />
      },
      {
        path: 'shift',
        children: [
          {
            index: true,
            element: <MDShift />
          },
          {
            path: 'detail/:id',
            element: <MDShiftDetail />
          }
        ]
      }
    ]
  },
  {
    path: 'sales-order',
    children: [
      {
        index: true,
        element: <ListSalesOrder />
      },
      {
        path: 'add',
        element: <AddSalesOrder />
      }
    ]
  },
  {
    path: 'inventory-transfer',
    children: [
      {
        index: true,
        element: <ListInventoryTransfer />
      },
      {
        path: 'form',
        children: [
          {
            path: 'create',
            index: true,
            element: <CreateFormInventoryTransfer />
          }
        ]
      },
      {
        path: 'manual',
        children: [
          {
            path: 'create',
            index: true,
            element: <CreateEditManualInventoryTransfer type='CREATE' />
          },
          {
            path: 'edit',
            element: <CreateEditManualInventoryTransfer type='EDIT' />
          }
        ]
      },
      {
        path: 'delivery/:id',
        element: <DetailDelivery />
      },
      {
        path: 'detail-warehouse',
        element: <CreateEditManualInventoryTransfer />
      }
    ]
  },
  {
    path: 'delivery-plan',
    children: [
      {
        index: true,
        element: <ListDeliveryPlan />
      },
      {
        path: 'detail-delivery-plan/:id',
        element: <DetailDeliveryPlan />
      },
      {
        path: 'detail-delivery-order/:id',
        element: <DetailDeliveryOrder />
      },
      {
        path: 'edit/:id',
        element: <EditDeliveryPlan />
      }
    ]
  }
]

export default zes1dmsRoutes
