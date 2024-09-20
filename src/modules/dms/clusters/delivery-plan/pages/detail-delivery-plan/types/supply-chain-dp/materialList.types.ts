export interface IMaterialList {
  id: string | number
  name: string
  code: string
  status: string
  statusColor: 'primary' | 'info' | 'success'
  stock: number
  request: number
  pending: number
  confirmed: number
  remaining: number
}
