import { type EChartsOption, type ECharts as OriginalECharts, type SetOptionOpts } from 'echarts'

import { type CSSProperties } from 'react'

export type ChartProps = {
  option?: EChartsOption
  styleChart?: CSSProperties
  title?: string
  subTitle?: string
  chipLabel?: string
}
