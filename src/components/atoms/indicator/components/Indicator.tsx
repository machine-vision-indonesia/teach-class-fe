import { PropsIndicator } from '../types/indicator.types'
import { Box, useTheme } from '@mui/material'
import { getSize, getBgColor } from '../utils'

/**
 *
 * Badge Circle (Indicator) berfungsi sebagai representasi indikator status atau indikator perubahan informasi. Komponent ini memiliki 2 variasi property, size dan color. Size terdapat 2 pilihan: medium atau small. Pada color saat ini terdapat 7 opsi: primary, neutral, neutral inverted, danger, warning, success, dan info.
 */
export const Indicator = ({ color = 'primary', size = 'small' }: PropsIndicator) => {
  const theme = useTheme()

  return <Box width={getSize(size)} height={getSize(size)} bgcolor={getBgColor(theme, color)} borderRadius='100px' />
}
