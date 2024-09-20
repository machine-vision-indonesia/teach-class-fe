import { Box, useTheme } from '@mui/material'
import { PropsBadge } from '../types/badge.types'
import { Icon } from '@iconify/react'
import { MvTypography } from 'src/components/atoms/mv-typography'
import { getHeightBySize, getBgColor, getStyleRadiusValue, getIconSize, getIconColor, getLabelSize } from '../utils'

/**
 *
 * Badge adalah elemen antarmuka pengguna (UI) yang biasanya digunakan untuk menampilkan informasi kecil atau status penting.
 * Badge berfungsi sebagai representasi informasi singkat seperti status bukan berupa action.
 * Digunakan dalam memberikan notifikasi atau menunjukkan jumlah item yang perlu diperhatikan pengguna,
 * seperti pesan baru, notifikasi, atau item dalam keranjang belanja.
 */
export const Badge = ({
  color = 'primary',
  style = 'rect',
  isTransparent = false,
  size = 'small',
  icon,
  label
}: PropsBadge) => {
  const theme = useTheme()

  const getBgColorByType = () => {
    if (color.startsWith('#')) {
      return color
    } else {
      return getBgColor(isTransparent, theme, color)
    }
  }

  const getIconColorByType = () => {
    if (color.startsWith('#')) {
      return theme.palette.getContrastText(color)
    } else {
      return getIconColor(isTransparent, theme, color)
    }
  }

  return (
    <Box
      minWidth={getHeightBySize(size)}
      height={getHeightBySize(size)}
      display='inline-flex'
      justifyContent='center'
      alignItems='center'
      gap={0.5}
      bgcolor={getBgColorByType()}
      sx={{
        borderRadius: `${getStyleRadiusValue(style)}px`,
        lineHeight: 1.5,
        paddingX: label ? '6px' : 0,
        paddingY: label ? '2px' : 0
      }}
    >
      {icon && (
        <Icon icon={icon || ''} width={getIconSize(size)} height={getIconSize(size)} color={getIconColorByType()} />
      )}
      {label && (
        <MvTypography
          typeSize={'PX'}
          size={getLabelSize(size)}
          {...(color.startsWith('#') ? { color: theme.palette.getContrastText(color) } : {})}
        >
          {label}
        </MvTypography>
      )}
    </Box>
  )
}
