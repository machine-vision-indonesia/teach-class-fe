import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Grid, Stack, useTheme } from '@mui/material'

import { MvTypography } from '@/components/atoms/mv-typography'

import { Props } from 'react-apexcharts'
import { Icon } from '@iconify/react/dist/iconify.js'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ICardItem {
  label: string
  total: number
  icon: string
  color: 'success' | 'primary' | 'warning' | 'danger'
}

export interface ICardData {
  title: string
  total: number
  percentage: number
  description: string
  cardItem: ICardItem[]
}

interface IAnalysisCardProps {
  cardData: ICardData
}

export const AnalysisCard = ({ cardData }: IAnalysisCardProps) => {
  const theme = useTheme()

  const getItemColor = (color: 'success' | 'primary' | 'warning' | 'danger'): { color: string; bgColor: string } => {
    switch (color) {
      case 'success':
        return {
          color: theme.colorToken.icon.success.normal,
          bgColor: theme.colorToken.background.success.subtlest || '#ECF8EC'
        }
      case 'primary':
        return {
          color: theme.colorToken.icon.primary.normal,
          bgColor: theme.colorToken.background.primary.subtlest || '#E6EFFF'
        }
      case 'warning':
        return {
          color: theme.palette.orangeWarm.main,
          bgColor: theme.colorToken.background.orangeWarm.normal || '#FEE7DA'
        }
      default:
        return {
          color: theme.colorToken.icon.primary.normal,
          bgColor: theme.colorToken.background.primary.subtlest || '#E6EFFF'
        }
    }
  }

  const options: Props = {
    series: [cardData.percentage],
    width: 200,
    height: 200,
    options: {
      chart: {
        width: 200,
        height: 200,
        type: 'radialBar' as const,
        offsetY: 0
      },
      plotOptions: {
        radialBar: {
          startAngle: -270,
          endAngle: 90,
          dataLabels: {
            value: {
              offsetY: -5,
              fontSize: '28px',
              fontWeight: 500,
              color: undefined,
              formatter: function (val: string | number) {
                return val + '%'
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: ['#005EFF'],
          opacityFrom: 0.5,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ['']
    }
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      borderRadius={'6px'}
      padding={'16px'}
      gap={'10px'}
      width={400}
      maxWidth={'400px'}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={'8px'}
        width={'100%'}
        padding={'0 16px'}
      >
        <Stack alignItems={'start'} spacing={'10px'}>
          <MvTypography typeSize={'PX'} size={'SUBTITLE_MD'} color={theme.palette.neutral.subtlestText}>
            {cardData.title}
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'DISPLAY_SM'}>
            {cardData.total}
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'} color={theme.palette.neutral.subtlestText}>
            {cardData.description}
          </MvTypography>
        </Stack>
        <Box display={'flex'} justifyContent={'end'} borderRadius={'100px'} padding={'0px'}>
          <ReactApexChart
            options={options.options}
            series={options.series}
            type='radialBar'
            height={200}
            width={125}
            padding={'0px'}
          />
        </Box>
      </Stack>
      <Grid container columns={3} spacing={2}>
        {cardData.cardItem.map((dt, index) => (
          <Grid item xs={1} key={index}>
            <Stack direction={'row'} alignItems={'center'} spacing={'6px'} width={'100%'}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'100px'}
                bgcolor={getItemColor(dt.color).bgColor}
                padding={'8px'}
              >
                <Icon icon={dt.icon} width={'20px'} height={'20px'} color={getItemColor(dt.color).color} />
              </Box>
              <Stack alignItems={'start'} spacing={'2px'}>
                <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                  {dt.total}
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'HELPER_TEXT_SM'} color={theme.palette.neutral.subtlestText}>
                  {dt.label}
                </MvTypography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
