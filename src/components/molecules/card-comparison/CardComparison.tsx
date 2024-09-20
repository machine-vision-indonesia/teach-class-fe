import { Box, Button, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { PropsCardComparison } from './CardComparison.type'

export const CardComparison = ({ title, subTitle, data = [], comparisonText }: PropsCardComparison) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subTitle} />
      <CardContent sx={{ mt: 4, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr .5fr 1.25fr' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              justifyContent: 'left',
              width: '100%',
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <CustomChip
                rounded
                size='small'
                sx={{
                  background: '#A575FF33',
                  width: '36px',
                  height: '36px',
                  borderRadius: '999px !important',
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiChip-label': { display: 'none' },
                  '& .MuiChip-icon': { margin: 'unset', transform: 'rotate(-90deg)' }
                }}
                icon={<Icon icon='uis:layers-alt' color='#8340FF' />}
              />

              <Typography variant='subtitle2Medium'>{data[0]?.name}</Typography>
            </Box>
            <Typography variant='h2' sx={{ fontSize: '30px !important' }}>
              {data[0]?.mainValue}
            </Typography>
            <Typography sx={{ color: '#909094', fontSize: '24px', fontWeight: '400' }}>{data[0]?.subValue}</Typography>
          </Box>

          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <Chip
              sx={{
                background: '#2186D826',
                padding: 2,
                color: '#909094',
                borderRadius: '999',
                border: 'unset',
                '& .MuiChip-label': {
                  padding: 'unset'
                }
              }}
              variant='outlined'
              label={comparisonText}
            />
          </div>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
              justifyContent: 'right',
              width: '100%',
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'end' }}>
              <Typography variant='subtitle2Medium'>{data[1]?.name}</Typography>

              <CustomChip
                rounded
                size='small'
                sx={{
                  background: '#2186D826',
                  width: '36px',
                  height: '36px',
                  borderRadius: '999px !important',
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiChip-label': { display: 'none' },
                  '& .MuiChip-icon': { margin: 'unset' }
                }}
                icon={<Icon icon='mdi:check-circle-outline' color='#2286D8' />}
              />
            </Box>
            <Typography variant='h2' sx={{ fontSize: '30px !important' }}>
              {data[1]?.mainValue}
            </Typography>
            <Typography sx={{ color: '#909094', fontSize: '24px', fontWeight: '400' }}>{data[1]?.subValue}</Typography>
          </Box>
        </div>
      </CardContent>
    </Card>
  )
}
