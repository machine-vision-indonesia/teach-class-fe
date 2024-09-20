import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DataTable } from './DataTable'
import { rows } from '../../../@fake-db/table/static-data'
import Box from '@mui/material/Box'
import { Chip } from '../chip/components/Chip'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/DataTable',
  component: DataTable
} as ComponentMeta<typeof DataTable>

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'email',
    headerName: 'Email'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'start_date',
    headerName: 'Date'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'experience',
    headerName: 'Experience'
  },
  {
    flex: 0.1,
    field: 'age',
    minWidth: 80,
    headerName: 'Age'
  }
]
const columnsChips = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'email',
    headerName: 'Email'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'start_date',
    headerName: 'Date'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'experience',
    headerName: 'Experience',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return <Chip label={row.experience} />
    }
  },
  {
    flex: 0.1,
    field: 'age',
    minWidth: 80,
    headerName: 'Age',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return <Chip label={row.age} />
    }
  }
]

const columnsAction = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'email',
    headerName: 'Email'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'start_date',
    headerName: 'Date'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'experience',
    headerName: 'Experience'
  },
  {
    flex: 0.1,
    field: 'age',
    minWidth: 80,
    headerName: 'Age'
  },
  {
    flex: 0.1,
    field: 'action',
    minWidth: 80,
    headerName: 'Action',
    renderCell: () => {
      return (
        <Stack direction='row'>
          <IconButton>
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
          <IconButton>
            <Icon icon='mdi:trash-outline' color='#DA2122' />
          </IconButton>
        </Stack>
      )
    }
  }
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataTable> = args => (
  <Box height='400px'>
    <DataTable {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  columns: columns,
  rows: rows.slice(0, 10)
}

export const Selection = Template.bind({})
Selection.args = {
  columns: columns,
  rows: rows.slice(0, 10),
  checkboxSelection: true
}

export const CustomChip = Template.bind({})
CustomChip.args = {
  columns: columnsChips,
  rows: rows.slice(0, 10)
}
export const Action = Template.bind({})
Action.args = {
  columns: columnsAction,
  rows: rows.slice(0, 10)
}

// export const MonthYear = Template.bind({})
// Default.args = {
//   variant: 'monthpicker'
// }
// export const TimePicker = Template.bind({})
// Default.args = {
//   variant: 'timepicker'
// }
