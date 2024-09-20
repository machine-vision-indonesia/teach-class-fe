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
import { SumCard } from '@/components/molecules/sum-card'
import { Table } from '@/components/molecules/table'
import { generateUUID } from '@/modules/dms/common/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Grid, Menu, MenuItem, Stack, useTheme } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailModal } from './components/DetailModal'
import { SumCardGrid } from './types/sumCardGrid.types'
import { IKanbanDummyItem } from '@/modules/dms/common/types/kanbanCard.types'
import { BASE_INVENTORY_TRANSFER_PATH } from '@/modules/dms/common/constants'
import KanbanCard from '@/modules/dms/common/components/KanbanCard'

const ListInventoryTransfer = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('0')

  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedInventoryTransferId, setSelectedInventoryTransferId] = useState<string | number | null>(null)

  const [filters, setFilters] = useState<IFilterResult>()

  const [sumCardEntry, setSumCardEntry] = useState<SumCardGrid[]>([
    {
      backgroundIconColor: theme.colorToken.background.primary.subtlest,
      icon: (
        <Icon icon={'tabler:refresh'} color={theme.colorToken.icon.primary.normal} width={'26px'} height={'26px'} />
      ),
      statusLabel: 'Total ITR',
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
      statusLabel: 'ITR Scheduled',
      style: 'elevation',
      totalNumber: 10,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.palette.orangeWarm[50],
      icon: (
        <Icon
          icon={'material-symbols:check-circle-outline'}
          color={theme.palette.orangeWarm[600]}
          width={'26px'}
          height={'26px'}
        />
      ),
      statusLabel: 'ITR Confirm',
      style: 'elevation',
      totalNumber: 13,
      variant: 'left'
    },
    {
      backgroundIconColor: theme.colorToken.background.success.subtlest,
      icon: (
        <Icon
          icon={'tabler:truck-delivery'}
          color={theme.colorToken.icon.success.normal}
          width={'26px'}
          height={'26px'}
        />
      ),
      statusLabel: 'ITR Delivered',
      style: 'elevation',
      totalNumber: 5,
      variant: 'left'
    }
  ])

  const [sampleData, setSampleData] = useState<IKanbanDummyItem[]>([
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
      key: 'itr_number',
      name: 'Search by ITR Number',
      type: FilterType.SEARCH
    },
    {
      key: 'date_range',
      name: 'Date Range',
      type: FilterType.DATE_RANGE
    },
    {
      key: 'from',
      name: 'From',
      type: FilterType.SELECT,
      options: [],
      valueKey: '',
      labelKey: ''
    },
    {
      key: 'to',
      name: 'To',
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
          <ButtonCopy value={'1234'} title={'DP Number'} />
        </Stack>
      )
    },
    {
      field: 'itr_number',
      headerName: 'ITR Number',
      flex: 1,
      minWidth: 180,
      maxWidth: 230,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'transfer_date',
      headerName: 'TRANSFER DATE',
      flex: 1,
      minWidth: 150,
      maxWidth: 230,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
          {params.row.transfer_date}
        </MvTypography>
      )
    },
    {
      field: 'from',
      headerName: 'FROM',
      flex: 1,
      minWidth: 180,
      maxWidth: 230,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'to',
      headerName: 'TO',
      flex: 1,
      minWidth: 150,
      maxWidth: 230,
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
          <Badge color={'success'} isTransparent label='ITR Confirm' style={'circular'} size='medium' />
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
              navigate(`${BASE_INVENTORY_TRANSFER_PATH}/manual/edit`)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <Button
            variant='text'
            color='warning'
            content='iconOnly'
            icon='tabler:circle-check'
            onClick={() => {
              console.log(params.row.id)
            }}
            sx={{
              minWidth: 0,
              padding: '8px'
            }}
          />
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:eye'
            onClick={() => navigate('/solutions/dms/inventory-transfer/delivery/' + params.row.id)}
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
      id: 0,
      itr_number: '1234',
      transfer_date: 'DD/MM/YYYY',
      from: 'Warehouse B',
      to: 'Warehouse A'
    }
  ]

  const renderButtonAddITR = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    return (
      <>
        <Button
          variant='contained'
          content='iconText'
          icon='tabler:chevron-down'
          text='Add Inventory Transfer'
          disabled={activeTab !== '0'}
          onClick={e => setAnchorEl(e.currentTarget)}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem sx={{ gap: '8px' }} onClick={() => navigate('/solutions/dms/inventory-transfer/form/create')}>
            <Icon icon={'tabler:list-check'} />
            Select from SO
          </MenuItem>
          <MenuItem sx={{ gap: '8px' }} onClick={() => navigate('/solutions/dms/inventory-transfer/manual/create')}>
            <Icon icon={'tabler:plus'} />
            Manual Create
          </MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Inventory Transfer Request
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Inventory Transfer Request',
                  path: '/solutions/dms/inventory-transfer-request/'
                }
              ]}
            />
          </Stack>
          {renderButtonAddITR()}
        </Stack>
        <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
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
                  label: 'Scheduled',
                  renderContent: ''
                },
                {
                  label: 'Material Placement',
                  renderContent: ''
                },
                {
                  label: 'On Delivery',
                  renderContent: ''
                },
                {
                  label: 'Delivered',
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
                <Table columns={columns} rows={rows} checkboxSelection={false} />
              </Box>
              // <TableListAsync />
            )}
            {filters?.dataController?.viewMode === 'calendar' && (
              <>
                <Calendar
                  dataFetchService={fetchListCalendar}
                  onClick={e => {
                    setSelectedInventoryTransferId(e.event.id)
                    setDetailModalOpen(true)
                  }}
                />{' '}
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
                    setSelectedInventoryTransferId(e.id)
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
          id={selectedInventoryTransferId}
          isOpen={detailModalOpen}
          onClose={() => {
            setSelectedInventoryTransferId(null)
            setDetailModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default ListInventoryTransfer
