// import ECharts from 'src/components/atoms/echarts/ECharts'
import { ChartProps } from './Charts.type'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import dynamic from 'next/dynamic'

const ECharts = dynamic(
  () => import('src/components/atoms/echarts/ECharts'),
  { ssr: false } // This will disable server-side rendering for ECharts
)

const Charts = ({ option = {}, styleChart, title, subTitle, chipLabel, background }: ChartProps) => {

  return (
    <Card sx={{ display: 'grid', height: 'fit-content', bgcolor: background }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0.5rem' }}>
        <Grid>
          {title && <Typography sx={{ fontSize: '16px', color: '#5D5E61', fontWeight: 700 }}>{title}</Typography>}

          {subTitle && (
            <Typography variant='body2' color={'#909094'}>
              {subTitle}
            </Typography>
          )}
        </Grid>

        {chipLabel && (
          <Typography
            sx={{
              padding: '4px 8px',
              fontWeight: '400',
              color: '#FF0307',
              background: '#FF2D321F',
              borderRadius: '4px'
            }}
          >
            {chipLabel}
          </Typography>
        )}
      </Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <ECharts option={option} style={{ height: '300px', ...styleChart }} />
      </CardContent>
    </Card>
  )
}

export default Charts
