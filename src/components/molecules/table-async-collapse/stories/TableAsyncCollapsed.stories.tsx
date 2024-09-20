import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IResultController } from '../../filter/types/filter.types'
import { TableAsyncCollapsed } from '../components/TableAsyncCollapsed'
import { fetchTableCollapsed } from '../services/fetchTableUsers.example.service'
// Define the meta information for the story
const meta: Meta<typeof TableAsyncCollapsed> = {
  title: 'Components/Template/TableAsyncCollapsed',
  component: TableAsyncCollapsed,
  parameters: {
    docs: {
      description: {
        component: 'A table component that supports asynchronous data fetching and collapsible rows. It can display grouped data with a customizable title and can be configured to show or hide grouped fields.'
      }
    }
  }
}

export default meta

// Define the story for the TableAsyncCollapsed component
export const Default: StoryObj<typeof TableAsyncCollapsed> = (args: any) => (
  <TableAsyncCollapsed {...args} />
)

// Provide default args for the story
Default.args = {
  dataFetchService: fetchTableCollapsed,
  columns: [
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'sto.name',
      headerName: 'DEPARTMENT',
      valueGetter: (params) => params.row.sto?.name || '-',
      flex: 1,
      sortable: false,
      disableColumnMenu: true
    }
  ],
  resultController: [
    {
      key: 'id',
      name: 'Department',
      type: 'SELECT',
      options: [
        {
          id: 'department',
          label: 'Department',
        }
      ],
      valueKey: 'code',
      labelKey: 'label',
    }
  ] as IResultController[],
  isCollapsed: true,
  groupFieldKeyTitle: 'name',
  groupName: 'user'
}
