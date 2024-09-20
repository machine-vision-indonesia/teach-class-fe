import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Grid, Menu, MenuItem, Stack, useTheme } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import Tabs from '@/components/atoms/tabs'
import { Badge, PropsBadge } from '@/components/atoms/badge'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { Button } from '@/components/atoms/button'
import { ButtonCopy } from '@/components/atoms/button-copy'
import { MvTypography } from '@/components/atoms/mv-typography'
import Calendar from '@/components/molecules/calendar/components/Calendar'
import { fetchListCalendar } from '@/components/molecules/calendar/services/fetchCalendar.service'

import { Filter } from '@/components/molecules/filter'
import { DataViewControllerType, FilterType } from '@/components/molecules/filter/constants'
import { IDataViewController, IResultController } from '@/components/molecules/filter/types/filter.types'
import { IFilterResult } from '@/components/molecules/filter/types/filterResult.types'
import { Table } from '@/components/molecules/table'

import CalendarLegend from './components/CalendarLegend'
import CalendarDetail from './components/CalendarDetail'
import { ILegend } from './types/calendar.types'
import { IStatisticCardProps } from './types/statisticCard.types'
import { IButtonMenuProps, ISalesOrder, SalesOrderStatus } from './types/salesOrder.types'
import { SumCard } from '@/components/molecules'
import { BASE_SALES_ORDER_PATH } from '@/modules/dms/common/constants'
import { useNavigate } from 'react-router-dom'
import { formatDateString } from '@/modules/dms/common/utils'

const ListSalesOrder = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('0')
  const [filters, setFilters] = useState<IFilterResult>()
  const [statisticsData, setStatisticsData] = useState<IStatisticCardProps[]>([
    {
      counter: 35,
      category: 'Total SO',
      icon: 'tabler:refresh',
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.subtlest
    },
    {
      counter: 10,
      category: 'Not on Intacs',
      icon: 'tabler:hourglass',
      color: theme.palette.violet.main,
      bgColor: theme.palette.violet.subtlest
    },
    {
      counter: 13,
      category: 'Approval',
      icon: 'tabler:circle-check',
      color: theme.palette.orangeWarm[600],
      bgColor: theme.palette.orangeWarm.subtlest
    },
    {
      counter: 7,
      category: 'Monitoring',
      icon: 'tabler:list-check',
      color: theme.palette.info.main,
      bgColor: theme.palette.info.subtlest
    },
    {
      counter: 5,
      category: 'Completed',
      icon: 'tabler:truck-delivery',
      color: theme.palette.success.main,
      bgColor: theme.palette.success.subtlest
    }
  ])
  const [calendarLegend, setCalendarLegend] = useState<ILegend[]>([
    { label: SalesOrderStatus.OPEN, color: theme.palette.primary.main },
    { label: SalesOrderStatus.CONFIRMED, color: theme.palette.accent.main },
    { label: SalesOrderStatus.SHIP, color: theme.palette.success.main },
    { label: SalesOrderStatus.CLOSE, color: theme.palette.neutral?.[600] || '#5A5D62' }
  ])
  const [isOpenDetailCalendar, setIsOpenDetailCalendar] = useState(false)

  const resultViewController: IResultController[] = [
    {
      key: 'dp_number',
      name: 'Search by SO Number',
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
        }
      ]
    }
  ]

  const defaultColumnsProps = {
    editable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true
  }

  const columns: GridColDef[] = [
    {
      field: 'button',
      headerName: '',
      flex: 0,
      width: 60,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <ButtonCopy value={params.row.so_number} title={'SO Number'} />
        </Stack>
      ),
      ...defaultColumnsProps
    },
    {
      field: 'so_number',
      headerName: 'SO Number',
      flex: 1,
      sortable: false,
      ...defaultColumnsProps
    },
    {
      field: 'delivery_date',
      headerName: 'DELIVERY DATE',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const dateString = formatDateString(params.row.delivery_date)

        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            {dateString || 'DD/MM/YYYY'}
          </MvTypography>
        )
      },
      ...defaultColumnsProps
    },
    {
      field: 'customer',
      headerName: 'CUSTOMER',
      flex: 1,
      sortable: false,
      ...defaultColumnsProps
    },
    {
      field: 'total_material',
      headerName: 'TOTAL MATERIAL',
      flex: 1,
      sortable: false,
      ...defaultColumnsProps
    },
    {
      field: 'total_dp',
      headerName: 'TOTAL DP',
      flex: 1,
      sortable: false,
      ...defaultColumnsProps
    },
    {
      field: 'progress',
      headerName: 'PROGRESS',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        let textColor = theme.palette.warning.main

        switch (params.row.progress) {
          case 100:
            textColor = theme.palette.success.main
            break
          case 0:
            textColor = theme.palette.neutral?.black || '#222325'
          default:
            break
        }
        return (
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'} color={textColor}>
            {params.row.progress}%
          </MvTypography>
        )
      },
      ...defaultColumnsProps
    },
    {
      field: 'is_open',
      headerName: 'STATUS',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const status = params.row.status
        let badgeColor: PropsBadge['color'] = 'neutral'

        switch (status) {
          case SalesOrderStatus.OPEN:
            badgeColor = 'primary'
            break
          case SalesOrderStatus.CONFIRMED:
            badgeColor = 'info'
            break
          case SalesOrderStatus.SHIP:
            badgeColor = 'success'
            break
          default:
            break
        }

        return (
          <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Badge color={badgeColor} isTransparent label={status} style={'circular'} size='medium' />
          </Stack>
        )
      },
      ...defaultColumnsProps
    },
    {
      field: 'action',
      headerName: 'ACTION',
      flex: 0,
      minWidth: 160,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} width={'100%'} spacing={2} alignItems={'center'} justifyContent={'center'}>
          <Button
            variant='text'
            content='iconOnly'
            icon='tabler:pencil'
            onClick={() => {
              navigate(`${BASE_SALES_ORDER_PATH}/edit/${params.row.id}`)
            }}
            sx={{
              minWidth: 0,
              width: '28px',
              padding: '6px'
            }}
          />
          <Button
            variant='text'
            color='error'
            content='iconOnly'
            icon='tabler:trash'
            onClick={() => {}}
            sx={{
              minWidth: 0,
              width: '28px',
              padding: '6px'
            }}
          />
          <ButtonMenu activeData={params.row} />
        </Stack>
      ),
      ...defaultColumnsProps
    }
  ]

  const ButtonMenu = ({ activeData }: IButtonMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    return (
      <>
        <Button
          variant='text'
          content='iconOnly'
          icon='tabler:dots-vertical'
          onClick={e => setAnchorEl(e.currentTarget)}
          sx={{
            minWidth: 0,
            width: '28px',
            padding: '6px'
          }}
        />

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem sx={{ gap: '8px' }}>
            <Icon icon={'tabler:truck-delivery'} color={theme.colorToken.icon.warning.normal} />
            Add Delivery Plan
          </MenuItem>
          <MenuItem
            sx={{ gap: '8px' }}
            onClick={() => {
              navigate(`${BASE_SALES_ORDER_PATH}/detail/${activeData?.id}`)
            }}
          >
            <Icon icon={'tabler:eye'} color={theme.colorToken.icon.primary.normal} />
            Detail
          </MenuItem>
        </Menu>
      </>
    )
  }

  const rows: ISalesOrder[] = [
    {
      id: 'SO001',
      code: 'SO001',
      so_number: '1234',
      delivery_date: new Date(),
      customer: 'Customer A',
      total_material: 3,
      total_dp: 3,
      progress: 0,
      status: SalesOrderStatus.OPEN
    },
    {
      id: 'SO002',
      code: 'SO002',
      so_number: '1234',
      delivery_date: new Date(),
      customer: 'Customer B',
      total_material: 6,
      total_dp: 6,
      progress: 50,
      status: SalesOrderStatus.CONFIRMED
    },
    {
      id: 'SO003',
      code: 'SO003',
      so_number: '1234',
      delivery_date: new Date(),
      customer: 'Customer C',
      total_material: 9,
      total_dp: 9,
      progress: 100,
      status: SalesOrderStatus.CLOSE
    },
    {
      id: 'SO004',
      code: 'SO004',
      so_number: '1234',
      delivery_date: new Date(),
      customer: 'Customer D',
      total_material: 1,
      total_dp: 9,
      progress: 100,
      status: SalesOrderStatus.SHIP
    }
  ]

  return (
    <>
      <Stack width={'100%'} alignItems={'flex-start'} rowGap={6}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Stack spacing={2}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Sales Order
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Sales Order',
                  path: BASE_SALES_ORDER_PATH
                }
              ]}
            />
          </Stack>
          <Button
            content='iconText'
            text='Add Sales Order'
            icon='tabler:plus'
            onClick={() => navigate(`${BASE_SALES_ORDER_PATH}/add`)}
          />
        </Stack>

        {/* Statistics Section */}
        <Grid container columns={{ xs: 2, md: 3, lg: 5 }} spacing={{ xs: 3, lg: 6 }}>
          {statisticsData.map((sd, index) => (
            <Grid item xs={1} key={index}>
              <SumCard
                totalNumber={sd.counter}
                statusLabel={sd.category}
                icon={<Icon icon={sd.icon || 'tabler:info-circle'} color={sd.color} width={26} />}
                backgroundIconColor={sd.bgColor}
              ></SumCard>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            bgcolor: theme.colorToken.background.neutral.normal,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            border: `1px solid ${theme.colorToken.border.neutral.normal}`,
            borderRadius: '6px',
            gap: '16px'
          }}
        >
          <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
            <Tabs
              activeTabs={activeTab}
              data={[
                {
                  label: 'Not on Intacs',
                  renderContent: ''
                },
                {
                  label: 'Outstanding SO Intacs',
                  renderContent: ''
                },
                {
                  label: 'Completed',
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
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px'
            }}
          >
            {filters?.dataController?.viewMode === 'list' && (
              <Box width={'100%'}>
                <Table columns={columns} rows={rows} checkboxSelection={false} />
              </Box>
            )}

            {filters?.dataController?.viewMode === 'calendar' && (
              <>
                <Calendar dataFetchService={fetchListCalendar} />
                <CalendarLegend legends={calendarLegend} />
              </>
            )}
          </Box>
        </Box>
      </Stack>

      {isOpenDetailCalendar && (
        <CalendarDetail isOpen={isOpenDetailCalendar} onClose={() => setIsOpenDetailCalendar(false)} />
      )}
    </>
  )
}

export default ListSalesOrder
