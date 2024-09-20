export interface IResponse<T> {
  data: T[] | T
  meta?: {
    filter_count?: number
  }
}
