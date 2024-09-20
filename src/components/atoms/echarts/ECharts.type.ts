import { ECElementEvent, EChartsOption, SetOptionOpts } from 'echarts'
import { CSSProperties } from 'react'

export type EChartsProps = {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
  onClick?: (el: ECElementEvent) => void
}
