import { IMaterialList } from './materialList.types'

export interface ILocation {
  id: string
  label: string
}

export interface IMaterialListItem {
  selectedPreparationLocation: ILocation | null
  material: IMaterialList
}

export interface IMaterialReady {
  id: string | number
  quantity_stock: number
  status: string
  allocation: number
  remaining: number
}
