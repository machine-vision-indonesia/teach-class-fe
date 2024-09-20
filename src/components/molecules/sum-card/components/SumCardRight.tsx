import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, CardContent, useTheme } from '@mui/material'
import { FC } from 'react'
import { ISumRightProps } from '../types/sumCardLeftRight.types'

export const SumCardRight: FC<ISumRightProps> = ({ icon, title, description, total, backgroundIconColor }) => {
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <MvTypography size='BODY_MD_BOLDEST' typeSize='PX'>
              {title}
            </MvTypography>
            <MvTypography size='BODY_MD_NORMAL' typeSize='PX' color={colorToken.icon.neutral.subtle}>
              {description}
            </MvTypography>
          </Box>
        </Box>

        {total !== null && total !== undefined ? (
          <MvTypography size='TITLE_MD' typeSize='PX'>
            {total}
          </MvTypography>
        ) : (
          <></>
        )}
      </CardContent>
    </Box>
  )
}
