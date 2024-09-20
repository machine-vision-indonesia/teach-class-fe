import { Box, Button, CardContent, Chip, Divider, Typography, useTheme } from '@mui/material'
import Icon from '../../../@core/components/icon'
import { PropsCardBadge, SummaryTypes } from './CardBadge.type'
import React from 'react'

const renderVariant = (
  name?: string,
  description?: string,
  iconName?: string,
  styles?: { text: string; bg: string },
  badgeValue?: string
) => {
  const newIconName: string = iconName as string
  const currBadge: string = badgeValue as string

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {newIconName && (
          <Box>
            <Icon icon={newIconName} fontSize={'40'}></Icon>
          </Box>
        )}

        <Box
          sx={{
            alignItems: 'center'
          }}
        >
          {name && (
            <Typography variant='h6' sx={{ color: '#2F3033' }}>
              {name}
            </Typography>
          )}

          {description && (
            <Typography variant='PlaceholderSm' sx={{ color: '#5D5E61' }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      <Box />

      <Box sx={{ display: 'flex', gap: 3 }}>
        {styles && (
          <Chip
            label={currBadge}
            sx={{
              height: '40px',
              width: '36px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              background: `${styles['bg']}`,
              color: `${styles['text']}`,
              fontWeight: 500,
              '& .MuiChip-label': { textTransform: 'capitalize' }
            }}
          />
        )}

        <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#909094' }}></div>

        <Chip
          label={'1'}
          color={'primary'}
          variant='outlined'
          sx={{
            fontWeight: 500,
            height: '40px',
            width: '36px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            '& .MuiChip-label': { textTransform: 'capitalize' }
          }}
        />
      </Box>
    </Box>
  )
}
export const CardBadge: React.FC<PropsCardBadge> = ({
  name,
  description,
  iconName,
  useShadow = false,
  badgeValue = 'A',
  style
}) => {
  const stylesBadge: any = {
    A: {
      text: '#DA1631',
      bg: '#DA163129'
    },
    B: {
      text: '#FA7322',
      bg: '#FA732229'
    },
    C: {
      text: '#80FF00',
      bg: '#80FF0029'
    },
    D: {
      text: '#13B25A',
      bg: '#13B25A29'
    }
  }
  const stylesProps = useShadow ? { boxShadow: '0px 0px 8px 0px #00000029' } : {}
  const currentBadge: {
    text: string
    bg: string
  } = stylesBadge[badgeValue]

  if (badgeValue) {
    return (
      <Box
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '4px',
          padding: '8px 12px',
          border: theme => `2px solid ${theme.palette.divider}`,
          ...stylesProps
        }}
      >
        {renderVariant(name, description, iconName, currentBadge, badgeValue)}
      </Box>
    )
  } else {
    return null
  }
}
