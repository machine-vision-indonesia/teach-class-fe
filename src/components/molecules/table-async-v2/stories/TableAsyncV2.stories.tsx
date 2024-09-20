import { Meta, StoryObj } from '@storybook/react'

import { Icon } from '@iconify/react'
import { GridValueGetterParams } from '@mui/x-data-grid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { formatInTimeZone } from 'date-fns-tz'
import { Button } from 'src/components/atoms/button'
import { FilterType } from '../../filter/constants'
import { TableAsyncV2 } from '../components/TableAsyncV2'
import { fetchDepartments } from '../services/fetchDepartmentDropdown.example.service'
import { GetTableUsers } from '../services/fetchTableUsers.example.service'

export default {
  title: 'Components/Template/TableAsyncV2',
  component: TableAsyncV2
} as Meta<typeof TableAsyncV2>

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } }
})

const Template: StoryObj<typeof TableAsyncV2> = args => <TableAsyncV2 {...args} />

export const CustomRow = Template.bind({})

CustomRow.decorators = [
  Story => {
    queryClient.setQueryData(['cash-key'], {
      //... set your mocked data here
    })

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  }
]

CustomRow.args = {
  //table param
  dataFetchService: GetTableUsers,
  columns: [
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 1,
      sortable: true,
      disableColumnMenu: true
    },
    {
      field: 'sto.name',
      headerName: 'DEPARTMENT',
      valueGetter: (params: GridValueGetterParams) => params.row.sto?.name || '-',
      flex: 1,
      sortable: true,
      disableColumnMenu: true
    },
    {
      field: 'sto.date_created',
      headerName: 'DEPARTMENT DATE CREATED',
      valueGetter: (params: GridValueGetterParams) => {
        if (!params.row.sto) {
          return '-'
        }

        const date = new Date(params.row.sto.date_created)

        return formatInTimeZone(date, 'Asia/Jakarta', 'dd MMMM yyyy')
      },
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      renderCell: () => (
        <>
          <Button variant='text' color='primary' size='small'>
            <Icon icon='uil:pen' />
          </Button>
          <Button variant='text' color='error' size='small'>
            <Icon icon='uil:trash-alt' />
          </Button>
        </>
      ),
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    }
  ],

  //filter param:
  type: 'inline',
  resultController: [
    {
      key: 'email',
      name: 'Search Email...',
      type: FilterType.SEARCH
    },
    {
      key: 'last_access',
      name: 'User Last Access',
      type: FilterType.DATE_RANGE
    },
    {
      key: 'sto',
      name: 'Department',
      type: FilterType.MULTI_SELECT,
      dataFetchService: fetchDepartments,
      valueKey: 'id',
      labelKey: 'name'
    },
  ],
}