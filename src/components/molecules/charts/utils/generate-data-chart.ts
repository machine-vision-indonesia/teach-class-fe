export function generateChartData({ rawData = [], legend = [] }) {
  let series: any
  if (rawData.length) {
    const totalData: any[] = []
    for (let i = 0; i < (rawData[0] as any).length; ++i) {
      let sum = 0
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i]
      }
      totalData.push(sum)
    }

    series = legend.map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '25%',
        barCategoryGap: '60%',
        groupPadding: 2,
        itemStyle: {
          borderRadius: 12,
          borderColor: sid == 0 ? '#005EFF' : sid == 1 ? '#FA7322' : '#2ABB6B',
          color: sid == 0 ? '#005EFF' : sid == 1 ? '#FA7322' : '#2ABB6B',
          marginTop: '24px',
          borderWidth: 8
        },
        label:
          sid == 2
            ? {
                show: true,
                position: 'top',
                formatter: (params: any) => Math.round(params.value * 1000) / 10
              }
            : { show: false },
        data: (rawData[sid] as any).map((d: any, idx: number) => (totalData[idx] <= 0 ? 0 : d / totalData[idx]))
      }
    })
  } else {
    series = []
  }

  return series
}
