export type IParams = {
  limit?: number
  offset?: number
  page?: number
  fields?: string[]
  sort?: string[] | string
  meta?: string[]
  aggregate?: any
  filter?: any
}
