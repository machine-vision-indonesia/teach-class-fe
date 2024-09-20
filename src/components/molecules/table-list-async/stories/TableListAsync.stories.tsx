import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Icon } from '@iconify/react'
import { GridValueGetterParams } from '@mui/x-data-grid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { formatInTimeZone } from 'date-fns-tz'
import { Button } from 'src/components/atoms/button'
import { TableListAsync } from '../components/TableListAsync'
import { GetTablePage } from '../services/fetchTablePage.example.service'
import { GetTableUsers } from '../services/fetchTableUsers.example.service'

export default {
  title: 'Components/Organism/TableListAsync',
  component: TableListAsync
} as ComponentMeta<typeof TableListAsync>

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } }
})

const Template: ComponentStory<typeof TableListAsync> = args => <TableListAsync {...args} />

export const Default = Template.bind({})
Default.decorators = [
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

Default.args = {
  columns: [
    { field: 'id', headerName: 'ID', width: 180, editable: false },
    { field: 'name', headerName: '[ITEM] NAME', width: 180, editable: false },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 180,
      editable: false,
      renderCell: () => (
        <>
          <Button content='iconOnly' icon='uil:pen' variant='text' color='primary' size='small' />
          <Button content='iconOnly' icon='uil:trash-alt' variant='text' color='error' size='small' />
        </>
      )
    }
  ],

  dataFetchService: GetTablePage,
  emptyText: 'No data created in the Page',
  renderEmptyComponent: <Button buttonStyle='plain' text='+ Create Instance' />
}

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
  dataFetchService: GetTableUsers,
  columns: [
    {
      field: 'email',
      headerName: 'EMAIL',
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'sto.name',
      headerName: 'DEPARTMENT',
      valueGetter: (params: GridValueGetterParams) => params.row.sto?.name || '-',
      flex: 1,
      sortable: false,
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
          <Button content='iconOnly' icon='uil:pen' variant='text' color='primary' size='small' />
          <Button content='iconOnly' icon='uil:trash-alt' variant='text' color='error' size='small' />
        </>
      ),
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    }
  ]
}
