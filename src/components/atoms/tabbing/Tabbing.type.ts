export interface DataTabbing {
  title: string
  countData?: number
  iconName?: string
  disabled?:boolean
}

export interface PropsTabbing {
  data: DataTabbing[]
}
