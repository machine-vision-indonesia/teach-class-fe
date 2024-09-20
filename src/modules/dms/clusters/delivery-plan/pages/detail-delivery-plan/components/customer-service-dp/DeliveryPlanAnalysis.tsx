import { MvTypography } from '@/components/atoms/mv-typography'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import React from 'react'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DeliveryPlanAnalysis = () => {
  const theme = useTheme()

  const options = {
    series: [75],
    options: {
      chart: {
        width: 250,
        height: 220,
        type: 'radialBar' as const,
        offsetY: 0
      },
      plotOptions: {
        radialBar: {
          startAngle: -120,
          endAngle: 240,
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
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ['']
    }
  }
  return (
    <Stack width={'100%'} alignItems={'start'}>
      <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
        <Box
          width={{
            xs: '100%',
            lg: '70%'
          }}
        >
          <Grid container columns={{ xs: 1, sm: 2 }} spacing={4}>
            <Grid item xs={1}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
                padding={'16px'}
                paddingTop={'0px'}
                paddingRight={'0px'}
                gap={'20px'}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  spacing={'8px'}
                  width={'100%'}
                >
                  <Stack alignItems={'start'} spacing={'10px'}>
                    <MvTypography typeSize={'PX'} size={'SUBTITLE_MD'} color={theme.palette.neutral.subtlestText}>
                      Production Batching
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'DISPLAY_SM'}>
                      0
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                      Total Schedule
                    </MvTypography>
                  </Stack>
                  <Box display={'flex'} justifyContent={'end'} borderRadius={'100px'} padding={'0px'}>
                    <ReactApexChart
                      options={options.options}
                      series={options.series}
                      type='radialBar'
                      height={220}
                      width={220}
                      padding={'0px'}
                    />
                  </Box>
                </Stack>
                <Grid container columns={3} spacing={2}>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.orangeWarm.normal}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'mdi:hourglass-empty'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.palette.orangeWarm.main}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          On Process
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.subtlest}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'material-symbols:playlist-add-check'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.colorToken.icon.primary.normal}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          Quality Control
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.success.subtlest}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'material-symbols:warehouse-outline'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.colorToken.icon.success.normal}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          Stored
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
                border={`1px solid ${theme.colorToken.border.neutral.normal}`}
                borderRadius={'6px'}
                padding={'16px'}
                paddingTop={'0px'}
                paddingRight={'0px'}
                gap={'20px'}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  spacing={'8px'}
                  width={'100%'}
                >
                  <Stack alignItems={'start'} spacing={'10px'}>
                    <MvTypography typeSize={'PX'} size={'SUBTITLE_MD'} color={theme.palette.neutral.subtlestText}>
                      Material Transfer Request
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'DISPLAY_SM'}>
                      0
                    </MvTypography>
                    <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                      Total Request Material
                    </MvTypography>
                  </Stack>
                  <Box display={'flex'} justifyContent={'end'} borderRadius={'100px'} padding={'0px'}>
                    <ReactApexChart
                      options={options.options}
                      series={options.series}
                      type='radialBar'
                      height={220}
                      width={220}
                      padding={'0px'}
                    />
                  </Box>
                </Stack>
                <Grid container columns={3} spacing={2}>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.orangeWarm.normal}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'material-symbols:check-circle-outline'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.palette.orangeWarm.main}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          Confirmed
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.primary.subtlest}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'material-symbols:local-shipping-outline'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.colorToken.icon.primary.normal}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          On Delivery
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'6px'}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'100px'}
                        bgcolor={theme.colorToken.background.success.subtlest}
                        padding={'8px'}
                      >
                        <Icon
                          icon={'material-symbols:local-shipping-outline'}
                          width={'20px'}
                          height={'20px'}
                          color={theme.colorToken.icon.success.normal}
                        />
                      </Box>
                      <Stack alignItems={'start'} spacing={'2px'}>
                        <MvTypography typeSize={'PX'} size={'BODY_MD_BOLDEST'}>
                          0
                        </MvTypography>
                        <MvTypography
                          typeSize={'PX'}
                          size={'HELPER_TEXT_SM'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          Delivered
                        </MvTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Stack>
  )
}

export default DeliveryPlanAnalysis
