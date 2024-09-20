import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, CardContent, useTheme } from '@mui/material'
import { FC } from 'react'
import { ISumLeftProps } from '../types/sumCardLeftRight.types'

export const SumCardLeft: FC<ISumLeftProps> = ({ icon, statusLabel, total, backgroundIconColor }) => {
  const { colorToken } = useTheme()
  return (
    <Box display={'flex'} alignItems={'center'} width={'100%'}>
      <CardContent
        sx={{
          p: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:last-child': { pb: 4 }
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          {total !== null && total !== undefined ? (
            <MvTypography size='LABEL_LG_BOLDEST' typeSize='PX'>
              {total}
            </MvTypography>
          ) : (
            <></>
          )}
          <MvTypography size='BODY_MD_NORMAL' typeSize='PX' color={colorToken.icon.neutral.subtle}>
            {statusLabel}
          </MvTypography>
        </Box>

        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          <Box
            sx={{
              bgcolor: backgroundIconColor,
              borderRadius: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50px',
              width: '50px'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Box>
  )
}
