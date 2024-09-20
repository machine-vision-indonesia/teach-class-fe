import { DataGridProps, GridColDef } from '@mui/x-data-grid'

export interface CustomGridColDef extends Omit<GridColDef, 'field'> {
  required?: boolean
  justifyContent?: 'flex-start' | 'center' | string
}

export interface PropsTable extends Omit<DataGridProps, 'columns'> {
  columns: CustomGridColDef[]
  rows: any[]
  checkboxSelection?: boolean
}
