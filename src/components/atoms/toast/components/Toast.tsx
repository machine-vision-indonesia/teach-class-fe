import { Icon } from '@iconify/react'
import { Box, IconButton, useTheme, Card } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { PropsToast } from '../types/toast.type'
import { MvTypography } from '../../mv-typography'

/**
 * Elemen yang memberikan informasi ringkas dan non-intrusif kepada pengguna. Toast umumnya muncul di bagian atas
 * atau bawah layar dan berisi pesan singkat yang memberitahu pengguna tentang hasil tindakan tertentu, seperti
 * konfirmasi penyimpanan, notifikasi kesalahan, atau informasi pembaruan. Desainnya harus cukup mencolok untuk
 * dilihat tapi tidak mengganggu pengguna dari tugas mereka.
 */
export const Toast = ({ content, variant, icon, type, title, size, onClose, iconColor }: PropsToast) => {
  const typeUsed = type ?? 'information'
  const variantUsed = variant ?? 'success'
  const { palette } = useTheme()
  const theme = useTheme()

  const getSize = {
    boxSize: () => {
      switch (size) {
        case 'small':
          return '288px'
        case 'large':
          return '320px'
        default:
          return '288px'
      }
    },
    fontSize: () => {
      switch (size) {
        case 'small':
          return 'MD'
        case 'large':
          return 'LG'
        default:
          return 'MD'
      }
    }
  }

  if (typeUsed == 'information') {
    return (
      <Card
        sx={{
          width: 'max-content',
          borderRadius: '6px',
          border: `1px solid ${theme.colorToken.border.neutral.normal}`
        }}
      >
        <Stack width={getSize.boxSize()}>
          <Stack
            sx={{
              bgcolor: '#F9F9FA',
              borderBottom: `1px solid ${theme.colorToken.border.neutral.normal}`
            }}
            direction='row'
            px='15px'
            py='5px'
            alignItems='center'
          >
            <Icon fontSize='18px' icon={icon} color={palette?.secondary.main[100]} />
            <MvTypography
              size={`LABEL_${getSize.fontSize()}_BOLDEST`}
              color={palette?.secondary.main[100]}
              typeSize='PX'
              ml='8px'
              flexGrow={1}
            >
              {title}
            </MvTypography>
            <IconButton onClick={onClose}>
              <Icon icon='material-symbols:close-rounded' color={palette.text.disabled} fontSize='16px' />
            </IconButton>
          </Stack>

          <Box px='15px' py='12px' bgcolor={theme.colorToken.background.neutral.normal}>
            {typeof content == 'string' ? (
              <MvTypography size={`BODY_${getSize.fontSize()}_NORMAL`} typeSize='PX'>
                {content}
              </MvTypography>
            ) : (
              <>{content}</>
            )}
          </Box>
        </Stack>
      </Card>
    )
  } else {
    return (
      <Card
        variant='outlined'
        sx={{
          width: 'max-content',
          borderRadius: '6px',
          backgroundColor: `${variantUsed ? `${theme?.colorToken.background?.[variantUsed]?.subtlest}` : 'white'}`,
          borderColor: theme.colorToken.background?.[variantUsed]?.normal,
          boxShadow: `0px 0px 12px 0px ${variantUsed === 'success' ? '#A7DDA9' : '#F69AA9'}`
        }}
      >
        <Stack width={getSize.boxSize()} justifyContent='start'>
          <Stack direction='row' px='12px' pt='10px' alignItems='start'>
            <Box
              bgcolor={theme.colorToken.background?.[variantUsed]?.normal}
              width='10%'
              padding={'3px'}
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='100%'
            >
              <Icon icon={icon} fontSize='18px' color={!iconColor ? palette?.secondary.contrastText : iconColor} />
            </Box>
            <Stack ml='12px' flexGrow={1}>
              <Stack justifyContent='center' height='26px'>
                <MvTypography
                  size={`LABEL_${getSize.fontSize()}_BOLDEST`}
                  typeSize='PX'
                  color={theme.colorToken.text?.[variantUsed]?.normal}
                >
                  {title}
                </MvTypography>
              </Stack>
              <Box pb='10px'>
                {typeof content == 'string' ? (
                  <MvTypography
                    size={`BODY_${getSize.fontSize()}_NORMAL`}
                    typeSize='PX'
                    color={theme.colorToken.text?.[variantUsed]?.normal}
                  >
                    {content}
                  </MvTypography>
                ) : (
                  <>{content}</>
                )}
              </Box>
            </Stack>
            <IconButton onClick={onClose}>
              <Icon
                icon='material-symbols:close-rounded'
                color={theme.colorToken.text?.[variantUsed]?.normal}
                fontSize='20px'
              />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    )
  }
}
