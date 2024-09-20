import React from 'react'
import { Grid, Stack } from '@mui/material'

import { AnalysisCard, ICardData } from './AnalysisCard'

export const DeliveryPlanAnalysis = () => {
  const cardData: ICardData[] = [
    {
      title: 'Production Batching',
      total: 0,
      percentage: 0,
      description: 'Total Schedule',
      cardItem: [
        {
          label: 'On Process',
          total: 0,
          icon: 'mdi:hourglass-empty',
          color: 'warning'
        },
        {
          label: 'Quality Control',
          total: 0,
          icon: 'material-symbols:playlist-add-check',
          color: 'primary'
        },
        {
          label: 'Stored',
          total: 0,
          icon: 'material-symbols:warehouse-outline',
          color: 'success'
        }
      ]
    },
    {
      title: 'Material Transfer Request',
      total: 0,
      percentage: 0,
      description: 'Total Request Material',
      cardItem: [
        {
          label: 'Confirmed',
          total: 0,
          icon: 'material-symbols:check-circle-outline',
          color: 'warning'
        },
        {
          label: 'On Delivery',
          total: 0,
          icon: 'material-symbols:local-shipping-outline',
          color: 'primary'
        },
        {
          label: 'Delivered',
          total: 0,
          icon: 'material-symbols:local-shipping-outline',
          color: 'success'
        }
      ]
    }
  ]

  return (
    <>
      <Stack width={'100%'} alignItems={'start'}>
        <Grid container columns={{ xs: 1, sm: 2 }} spacing={4} sx={{ justifyContent: 'center' }}>
          {cardData.map((item: ICardData, index: number) => (
            <Grid item xs={1} key={index} width={'100%'} maxWidth={'400px !important'}>
              <AnalysisCard cardData={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  )
}
