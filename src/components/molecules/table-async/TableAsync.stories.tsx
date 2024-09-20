import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TableAsync } from './TableAsync'
import { Button } from 'src/components/atoms/button'
import { Icon } from '@iconify/react'
import { GetTablePage } from './TableAsync.example.service'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GridValueGetterParams } from '@mui/x-data-grid'
import { GetTableUsers } from './GetTableUsers.service'
import { GetDropdownDepartments } from './GetDropdownDepartments.service'
import { formatInTimeZone } from 'date-fns-tz'

export default {
  title: 'Components/Molecules/TableAsync',
  component: TableAsync
} as ComponentMeta<typeof TableAsync>

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } }
})

const Template: ComponentStory<typeof TableAsync> = args => <TableAsync {...args} />

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
          <Button variant='text' color='primary' size='small' content='iconOnly' icon='uil:pen' />
          <Button variant='text' color='error' size='small' content='iconOnly' icon='uil:trash-alt' />
        </>
      )
    }
  ],

  dataFetchService: GetTablePage,
  title: 'LIST MT PAGE'
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
          <Button variant='text' color='primary' size='small' content='iconOnly' icon='uil:pen' />
          <Button variant='text' color='error' size='small' content='iconOnly' icon='uil:trash-alt' />
        </>
      ),
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    }
  ],
  filters: [
    {
      type: 'dropdown-multiple',
      name: 'Department',
      labelKey: 'name',
      field: 'sto',
      dataFetchService: GetDropdownDepartments
    }
  ]
}
