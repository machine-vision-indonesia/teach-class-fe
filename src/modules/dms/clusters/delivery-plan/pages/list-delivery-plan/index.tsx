import { Badge } from '@/components/atoms/badge'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { Button } from '@/components/atoms/button'
import { ButtonCopy } from '@/components/atoms/button-copy'
import { MvTypography } from '@/components/atoms/mv-typography'
import Tabs from '@/components/atoms/tabs'
import Calendar from '@/components/molecules/calendar/components/Calendar'
import { fetchListCalendar } from '@/components/molecules/calendar/services/fetchCalendar.service'
import { Filter } from '@/components/molecules/filter'
import { DataViewControllerType, FilterType } from '@/components/molecules/filter/constants'
import { IDataViewController, IResultController } from '@/components/molecules/filter/types/filter.types'
import { IFilterResult } from '@/components/molecules/filter/types/filterResult.types'
import { IKanbanCardItem } from '@/modules/dms/common/types/kanbanCardAsync.types'
import { formatDateString, generateUUID } from '@/modules/dms/common/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Grid, IconButton, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { DetailModal } from './components/DetailModal'
import { SumCard, Table } from '@/components/molecules'
import { SumCardGrid } from './types/sumCardGrid.types'
import { BASE_DELIVERY_PLAN_PATH } from '@/modules/dms/common/constants'
import { useNavigate } from 'react-router-dom'

const ListDeliveryPlan = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('0')

  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedDeliveryPlanId, setSelectedDeliveryPlanId] = useState<string | number | null>(null)

  const [filters, setFilters] = useState<IFilterResult>()

  const [sumCardEntry, setSumCardEntry] = useState<SumCardGrid[]>([
    {
      backgroundIconColor: theme.colorToken.background.primary.subtlest,
      icon: (
        <Icon icon={'tabler:refresh'} color={theme.colorToken.icon.primary.normal} width={'26px'} height={'26px'} />
      ),
      statusLabel: 'Total Delivery Plan',
      style: 'elevation',
      totalNumber: 35,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.palette.violet[50],
      icon: (
        <Icon
          icon={'tabler:hourglass'}
          color={theme.colorToken.chart.accents.violet.default}
          width={'26px'}
          height={'26px'}
        />
      ),
      statusLabel: 'Monitoring',
      style: 'elevation',
      totalNumber: 10,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.palette.orangeWarm[50],
      icon: <Icon icon={'tabler:zoom-question'} color={theme.palette.orangeWarm[600]} width={'26px'} height={'26px'} />,
      statusLabel: 'Need Delivery',
      style: 'elevation',
      totalNumber: 13,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.colorToken.background.info.subtlest,
      icon: (
        <Icon icon={'tabler:truck-delivery'} color={theme.colorToken.icon.info.normal} width={'26px'} height={'26px'} />
      ),
      statusLabel: 'Need Delivery',
      style: 'elevation',
      totalNumber: 7,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.colorToken.background.success.subtlest,
      icon: (
        <Icon
          icon={'material-symbols:check-circle-outline'}
          color={theme.colorToken.icon.success.normal}
          width={'26px'}
          height={'26px'}
        />
      ),
      statusLabel: 'Delivered',
      style: 'elevation',
      totalNumber: 5,
      variant: 'left'
    }
  ])

  const [sampleData, setSampleData] = useState<IKanbanCardItem[]>([
    {
      id: generateUUID(),
      status: {
        name: 'Open',
        color: '#005EFF'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Open',
        color: '#005EFF'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'SCM Approved',
        color: '#6E65CE'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'SCM Approved',
        color: '#6E65CE'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Production Approved',
        color: '#FA7322'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Production Approved',
        color: '#FA7322'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Delivery Approved',
        color: '#DE4095'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Delivery Approved',
        color: '#DE4095'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Inquiry Confirm',
        color: '#84C049'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Inquiry Confirm',
        color: '#84C049'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Inquiry Re-Confirm',
        color: '#E90229'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Inquiry Re-Confirm',
        color: '#E90229'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Delivery Scheduled',
        color: '#D4B200'
      }
    },
    {
      id: generateUUID(),
      status: {
        name: 'Delivery Scheduled',
        color: '#D4B200'
      }
    }
  ])

  const resultViewController: IResultController[] = [
    {
      key: 'dp_number',
      name: 'Search by DP Number',
      type: FilterType.SEARCH
    },
    {
      key: 'date_range',
      name: 'Date Range',
      type: FilterType.DATE_RANGE
    },
    {
      key: 'customer',
      name: 'Customer',
      type: FilterType.SELECT,
      options: [],
      valueKey: '',
      labelKey: ''
    },
    {
      key: 'status',
      name: 'Status',
      type: FilterType.SELECT,
      options: [],
      valueKey: '',
      labelKey: ''
    }
  ]

  const dataViewController: IDataViewController[] = [
    {
      key: 'viewMode',
      name: 'View Mode',
      type: DataViewControllerType.BUTTON_GROUP,
      options: [
        {
          key: 'list',
          label: 'List',
          icon: 'tabler:layout-list'
        },
        {
          key: 'calendar',
          label: 'Calendar',
          icon: 'tabler:calendar'
        },
        {
          key: 'kanban',
          label: 'Kanban',
          icon: 'tabler:layout-kanban'
        }
      ]
    }
  ]

  const columns: GridColDef[] = [
    {
      field: 'button',
      headerName: '',
      flex: 0,
      width: 60,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <ButtonCopy value={params.row.dp_number} title={'DP Number'} />
        </Stack>
      )
    },
    {
      field: 'dp_number',
      headerName: 'DP NUMBER',
      flex: 1,
      minWidth: 180,
      maxWidth: 215,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'so_number',
      headerName: 'SO NUMBER',
      flex: 1,
      minWidth: 180,
      maxWidth: 215,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'delivery_date',
      headerName: 'DELIVERY DATE',
      flex: 1,
      minWidth: 150,
      maxWidth: 180,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
          {formatDateString(params.row.delivery_date)}
        </MvTypography>
      )
    },
    {
      field: 'customer',
      headerName: 'CUSTOMER',
      flex: 1,
      minWidth: 150,
      maxWidth: 180,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'total_material',
      headerName: 'TOTAL MATERIAL',
      flex: 1,
      minWidth: 125,
      maxWidth: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      minWidth: 125,
      maxWidth: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Badge color={'primary'} isTransparent label={params.row.status} style={'circular'} size='medium' />
        </Stack>
      )
    },
    {
      field: 'action',
      headerName: 'ACTION',
      flex: 1,
      minWidth: 115,
      maxWidth: 160,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              navigate(`${BASE_DELIVERY_PLAN_PATH}/edit/${params.row.id}`)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <IconButton
            color='warning'
            size='small'
            onClick={() => navigate(`${BASE_DELIVERY_PLAN_PATH}/detail-delivery-order/${params.row.id}`)}
            sx={{ padding: '8px' }}
          >
            <Icon icon='tabler:circle-check' />
          </IconButton>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:eye'
            onClick={() => {
              // ini nanti navigate ke detail tapi berdasarkan kondisi status dari tiap row nya
              // jadi masih menyusul
              navigate(`${BASE_DELIVERY_PLAN_PATH}/detail-delivery-plan/${params.row.id}`)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
        </Stack>
      )
    }
  ]

  const rows = [
    {
      id: generateUUID(),
      dp_number: '1234',
      so_number: '7653',
      delivery_date: new Date(),
      customer: 'Customer A',
      total_material: 6,
      status: 'Open'
    },
    {
      id: generateUUID(),
      dp_number: '4546',
      so_number: '7653',
      delivery_date: new Date(),
      customer: 'Customer B',
      total_material: 4,
      status: 'Open'
    },
    {
      id: generateUUID(),
      dp_number: '7564',
      so_number: '7653',
      delivery_date: new Date(),
      customer: 'Customer C',
      total_material: 7,
      status: 'Open'
    }
  ]

  return (
    <>
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack spacing={2}>
          <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
            Delivery Plan
          </MvTypography>
          <Breadcrumbs
            data={[
              {
                label: 'Home',
                path: '/'
              },
              {
                label: 'Delivery Plan',
                path: BASE_DELIVERY_PLAN_PATH
              }
            ]}
          />
        </Stack>
        <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4}>
          {sumCardEntry.map((sumCard, index) => (
            <Grid item xs={1} key={index}>
              <SumCard {...sumCard} />
            </Grid>
          ))}
        </Grid>
        <Box
          bgcolor={theme.colorToken.background.neutral.normal}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          padding={'16px'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          borderRadius={'6px'}
          gap={'16px'}
        >
          <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
            <Tabs
              activeTabs={activeTab}
              data={[
                {
                  label: 'Open',
                  renderContent: ''
                },
                {
                  label: 'On Process',
                  renderContent: ''
                },
                {
                  label: 'Need Delivery',
                  renderContent: ''
                },
                {
                  label: 'On Delivery',
                  renderContent: ''
                },
                {
                  label: 'Delivered',
                  renderContent: ''
                },
                {
                  label: 'Archive',
                  renderContent: ''
                }
              ]}
              onChange={value => {
                setActiveTab(value)
              }}
            />
          </Stack>
          <Filter
            type='inline'
            resultController={resultViewController}
            dataViewController={dataViewController}
            onChange={value => setFilters(value)}
          />
          <Box
            width={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'16px'}
            rowGap={'16px'}
          >
            {filters?.dataController?.viewMode === 'list' && (
              <Box width={'100%'}>
                {/* <TableListAsync dataFetchService={GetTableUsers} columns={columns} /> */}
                <Table columns={columns} checkboxSelection={false} rows={rows} />
              </Box>
            )}
            {filters?.dataController?.viewMode === 'calendar' && (
              <>
                <Calendar
                  dataFetchService={fetchListCalendar}
                  onClick={e => {
                    setSelectedDeliveryPlanId(e.event.id)
                    setDetailModalOpen(true)
                  }}
                />
                <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  gap={'16px'}
                  padding={'16px'}
                  borderRadius={'6px'}
                  border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                >
                  <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                    Status Legend
                  </MvTypography>
                  <Stack
                    direction={'row'}
                    width={'100%'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    spacing={'16px'}
                  >
                    {/* pewarnaan dari box rounded nanti ambil dari tiap master data status */}
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Inquiry Confirm
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        DO Open
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        On Going Stuffing
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Ready for Delivery
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        On Delivery
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Delivered
                      </MvTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                        width={'20px'}
                        height={'20px'}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                        Close
                      </MvTypography>
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
            {filters?.dataController?.viewMode === 'kanban' && (
              <Box width={'100%'}>
                <KanbanCard
                  data={sampleData}
                  statusOrder={[
                    'Open',
                    'SCM Approved',
                    'Production Approved',
                    'Delivery Approved',
                    'Inquiry Confirm',
                    'Inquiry Re-Confirm',
                    'Delivery Scheduled'
                  ]}
                  onClick={e => {
                    setSelectedDeliveryPlanId(e.id)
                    setDetailModalOpen(true)
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
      {detailModalOpen && (
        <DetailModal
          id={selectedDeliveryPlanId}
          isOpen={detailModalOpen}
          onClose={() => {
            setSelectedDeliveryPlanId(null)
            setDetailModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default ListDeliveryPlan
