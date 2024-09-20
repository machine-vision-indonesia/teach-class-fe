import { useRef, useEffect, type CSSProperties } from 'react'
import {
  init,
  getInstanceByDom,
  type EChartsOption,
  type ECharts as OriginalECharts,
  type SetOptionOpts
} from 'echarts'
import { EChartsProps } from './ECharts.type'

const ECharts = ({ option, style, settings, loading, theme, onClick }: EChartsProps) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize chart
    let chart: OriginalECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme)
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    // Return cleanup function
    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.on('click', (el) => {
        if (onClick) {
          onClick(el)
        }
      })
      chart?.setOption(option, settings)
    }
  }, [option, settings, theme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading()
    }
  }, [loading, theme])

  return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
}

export default ECharts
