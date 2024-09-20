import { ReactNode } from 'react'

export interface PropsCardComparison {
  title?: string
  subTitle?: string
  data?: {
    name?: string
    icon?: string
    color?: string[]
    mainValue?: string
    subValue?: string
  }[]
  comparisonText?: string
}
