import { GridRenderCellParams } from '@mui/x-data-grid'
import type { Meta, StoryObj } from '@storybook/react'
import Table from '../components/Table'
import { Box, IconButton } from '@mui/material'
import Icon from '@/@core/components/icon'
import { PropsTable } from '../types/table.type'
import { Avatar } from '@/components/atoms/avatar'

const meta: Meta<typeof Table> = {
  title: 'Components/Molecules/Table',
  component: Table,
  argTypes: {
    columns: {
      control: 'object'
    },
    rows: {
      control: 'object'
    }
  }
}

export default meta

const columns = [
  {
    field: 'text1',
    headerName: 'LABEL NORMAL',
    width: 200,
    editable: true,
    required: true,
    justifyContent: 'flex-start',
    sortable: true
  },
  {
    field: 'text2',
    headerName: 'LABEL BLUE',
    width: 200,
    editable: true,
    required: false,
    justifyContent: 'flex-start',
    sortable: true,
    renderCell: (params: GridRenderCellParams) => <Box color='blue'>{params.value}</Box>
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 150,
    editable: true,
    required: true,
    justifyContent: 'center',
    sortable: true,
    /**
     * Renders a cell with a colored background and a green text.
     *
     * @param {GridRenderCellParams} params - The parameters for rendering the cell.
     * @return {JSX.Element} The JSX element representing the cell.
     */
    renderCell: (params: GridRenderCellParams) => (
      <Box bgcolor={'#edf8ec'} borderRadius={1} padding={1} color='green'>
        {params.value}
      </Box>
    )
  },
  {
    field: 'username',
    headerName: 'USERNAME',
    width: 200,
    editable: true,
    required: true,
    justifyContent: 'flex-start',
    sortable: true,
    /**
     * Renders a cell with an icon and a value.
     *
     * @param {GridRenderCellParams} params - The parameters for rendering the cell.
     * @return {JSX.Element} The JSX element representing the cell with an icon and a value.
     */
    renderCell: (params: GridRenderCellParams) => (
      <Box display='flex' alignItems='center' gap={2}>
        <Avatar type={'image'} isAsync={false} size='xs' />
        {params.value}
      </Box>
    )
  },
  {
    field: 'label',
    headerName: 'LABEL',
    width: 150,
    editable: true,
    required: true,
    justifyContent: 'flex-start',
    sortable: false,
    /**
     * Renders a cell with a blue background, white text, rounded corners, and centered content.
     *
     * @param {GridRenderCellParams} params - The parameters for rendering the cell.
     * @return {JSX.Element} The JSX element representing the cell.
     */
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgcolor='blue'
        color='white'
        borderRadius={1}
        paddingX={3}
        paddingY={1}
      >
        {params.value}
      </Box>
    )
  },
  {
    field: 'labelKosong',
    headerName: 'LABEL KOSONG',
    width: 200,
    editable: true,
    required: false,
    justifyContent: 'flex-start',
    sortable: true
  },
  {
    field: 'actions',
    headerName: 'ACTIONS',
    width: 150,
    sortable: false,
    required: true,
    justifyContent: 'flex-start',
    /**
     * A description of the entire function.
     *
     * @return {void} No return value for this function
     */
    renderCell: () => (
      <Box display='flex' justifyContent='center'>
        <IconButton>
          <Icon icon='tabler:pencil' color='blue' />
        </IconButton>
        <IconButton>
          <Icon icon='tabler:eye' color='blue' />
        </IconButton>
        <IconButton>
          <Icon icon='icon-park-outline:more-one' />
        </IconButton>
      </Box>
    )
  },
  {
    field: 'headerLabel',
    headerName: '',
    width: 200,
    editable: true,
    required: false,
    justifyContent: 'flex-start',
    sortable: true,
    renderCell: (params: GridRenderCellParams) => <Box fontWeight={'bold'}>{params.value}</Box>
  }
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const rows = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index,
    text1: `Text Content ${alphabet[index]}`,
    text2: `Text Content ${alphabet[index]}`,
    status: `Status ${alphabet[index]}`,
    username: `Username ${alphabet[index]}`,
    label: `+ Label ${alphabet[index]}`,
    labelKosong: '',
    headerLabel: `HEADER LABEL ${alphabet[index]}`
  }))

type Story = StoryObj<PropsTable>

export const Default: Story = {
  args: {
    columns,
    rows
  }
}
