import { DataGridProps, GridRenderCellParams } from '@mui/x-data-grid'
export interface PropsTableAppend extends Omit<DataGridProps, 'rows' | 'columns'> {
  columns: CustomGridColDef[]
  rows?: any[]
  titleTableHead?: string
  textButton?: string
  colorNull?: string
  textNull?: string
  controllerName: string
  control: any
  values: any[]
  initialNewValue: any
}

export interface CustomGridColDef {
  field: string
  headerName: string
  width?: number
  minWidth?: number
  maxWidth?: number
  flex?: number
  editable: boolean
  required: boolean
  sortable: boolean
  disableColumnMenu: boolean
  justifyContent?: string
  renderCell?: (params: GridRenderCellParams) => React.ReactNode // Correctly typed renderCell
}
