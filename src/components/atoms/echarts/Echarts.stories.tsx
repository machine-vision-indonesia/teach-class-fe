import { type Meta, type StoryObj } from '@storybook/react'
import ECharts from './ECharts'
import { EChartsProps } from './ECharts.type'


const meta: Meta<typeof ECharts> = {
  title: 'Components/Atoms/ECharts',
  component: ECharts
}

export default meta

type Story = StoryObj<typeof ECharts>

const option: EChartsProps['option'] = {
  dataset: {
    source: [
      ['Commodity', 'Owned', 'Financed'],
      ['Commodity 1', 4, 1],
      ['Commodity 2', 2, 4],
      ['Commodity 3', 3, 6],
      ['Commodity 4', 5, 3]
    ]
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Owned', 'Financed']
  },
  grid: {
    left: '10%',
    right: '0%',
    top: '20%',
    bottom: '20%'
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category'
  },
  series: [
    {
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      }
    },
    {
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      }
    }
  ]
}

export const Default: Story = {
  render: () => <ECharts option={option} />
}
