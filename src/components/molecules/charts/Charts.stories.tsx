import React from 'react'
// import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Meta, StoryObj } from '@storybook/react'
import Charts  from './Charts'
import { generateChartData } from './utils/generate-data-chart'

const rawData = [
  [100, 302, 301, 334, 390, 330],
  [320, 132, 101, 134, 90, 230],
  [220, 182, 191, 234, 290, 330],
  [150, 212, 201, 154, 190, 330],
  [820, 832, 901, 934, 1290, 1330],
  [10, 20, 300, 450, 400, 600]
]

const meta = {
  title: 'Components/Molecules/Charts',
  component: Charts
} satisfies Meta <typeof Charts>

export default meta

type Story = StoryObj<typeof meta>;

export const BarChartWithNoAxis : Story = {
  args: {
    option: {
      xAxis: {
        data: [1, 2, 3, 4, 5, 6, 7, 8],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        show: false,
        type: 'log'
      },
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
          data: [
            15,
            22,
            9,
            28,
            {
              value: 55,
              itemStyle: {
                borderRadius: 4,
                borderColor: '#9D08D2',
                color: '#9D08D2'
              }
            },
            28,
            {
              value: 43,
              itemStyle: {
                borderRadius: 4,
                borderColor: '#9D08D2',
                color: '#9D08D2'
              }
            },
            49
          ],
          barWidth: '30%',
          itemStyle: {
            borderRadius: 4,
            borderColor: '#FF94E7',
            color: '#FF94E7'
          }
        }
      ]
    },
    title: 'Title Card',
    subTitle: 'Sub title card',
    chipLabel: '+100'
  }
}
export const BarChartWithMultipleData : Story = {
args :{
  option: {
    legend: {
      orient: 'horizontal',
      bottom: 0
    },
    yAxis: {
      type: 'value',
      show: false
    },
    xAxis: {
      data: [1, 2, 3, 4, 5, 6],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },

    // @ts-ignore
    series: generateChartData({ rawData, legend: ['To Do', 'On Going', 'Done'] })
  },
  title: 'Title Card',
  subTitle: 'Sub title card'
}
}

export const BarChartVertical : Story ={
  args: {
    option: {
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      xAxis: {
        type: 'category',
        data: ['Equipment', 'Quality', 'Logistic', 'Others']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#2E2E2E'
        }
      },
      series: [
        {
          itemStyle: {
            color: '#005D5D'
          },
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    },
    title: 'Title Card',
    subTitle: 'Sub title card'
  }
}

export const BarChartHorizontal : Story ={}
BarChartHorizontal.args = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      orient: 'horizontal',
      top: 0,
      show: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Equipment', 'Quality', 'Logistic', 'Others', 'Others']
      }
    ],
    series: [
      {
        name: 'Top 1',
        type: 'bar',
        barGap: 0,
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#164FBE'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: 'Top 2',
        type: 'bar',
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#538BFA'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: 'Top 3',
        type: 'bar',
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#EEA83E'
        },
        data: [150, 232, 201, 154, 190]
      }
    ]
  },
  title: 'Title Card',
  subTitle: 'Sub title card'
}

export const PieChart : Story = {}
PieChart.args = {
  option: {
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center'
    },
    tooltip: {
      show: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
          show: false
        },
        data: [
          { value: 1048, name: 'Reported', itemStyle: { color: '#005EFF' } },
          { value: 735, name: 'Feedback', itemStyle: { color: '#FA7322' } },
          { value: 580, name: 'On Going Action', itemStyle: { color: '#9018EF' } },
          { value: 484, name: 'Done Action', itemStyle: { color: '#20C997' } },
          { value: 300, name: 'Revise', itemStyle: { color: '#20C997' } },
          { value: 300, name: 'Close Issue', itemStyle: { color: '#DA1631' } }
        ]
      }
    ]
  },
  styleChart: {
    width: '45vw'
  },
  title: 'Title Card',
  subTitle: 'Sub title card'
}

export const MixedLineAndBarChart : Story = {}
MixedLineAndBarChart.args = {
  option: {
    tooltip: {
      show: false
    },
    legend: {
      show: false
    },
    xAxis: [
      {
        type: 'category',
        data: ['Equipment', 'Logistic', 'Process', 'Quality', 'Tools', 'Part-Logistic', 'Part-Quality']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 400,
        interval: 100,
        axisLabel: {
          formatter: val => (val === 0 ? '' : `${val}`)
        }
      },
      {
        type: 'value',
        min: 0,
        max: 400,
        interval: 100,
        axisLabel: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'bar',
        label: {
          show: false
        },
        itemStyle: {
          color: '#005D5D'
        },
        data: [300, 400, 340, 320, 200, 340, 230, 250, 200, 300, 250, 270, 240, 340, 290]
      },
      {
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          color: '#FF9900'
        },
        data: [30, 40, 300, 310, 370]
      }
    ]
  },
  styleChart: {
    width: '45vw'
  },
  title: 'Title Card',
  subTitle: 'Sub title card'
}

export const StackedLineChart : Story = {}
StackedLineChart.args = {
  option: {
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 400,
        interval: 100,
        axisLabel: {
          formatter: val => ([0, 400].includes(val) ? '' : `${val}`)
        }
      }
    ],
    series: [
      {
        name: 'Tools',
        type: 'line',
        itemStyle: {
          color: '#FA4D56'
        },
        data: [150, 200, 210, 260, 380, 150, 210]
      },
      {
        name: 'Logistic',
        type: 'line',
        itemStyle: {
          color: '#198038'
        },
        data: [110, 340, 200, 210, 100, 230, 190]
      },
      {
        name: 'Process',
        type: 'line',
        itemStyle: {
          color: '#6929C4'
        },
        data: [230, 320, 200, 210, 300, 110, 230]
      }
    ]
  },
  styleChart: {
    width: '45vw'
  },
  title: 'Title Card',
  subTitle: 'Sub title card'
}
