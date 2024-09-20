import Box from '@mui/material/Box'
import { MvTypography } from '@/components/atoms/mv-typography'
import { PropsDateHeader } from '../types/RepositoryDocument.types'
import { useTheme } from '@mui/material'
import { getHeaderBackground } from '../utils/RepositoryDocument.utils'

export const Header = ({ date, color, sx }: PropsDateHeader) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: getHeaderBackground(color, theme),
        padding: '9px 16px',
        ...sx
      }}
    >
      {date && (
        <MvTypography
          size='TITLE_SM'
          typeSize='PX'
          sx={{
            fontWeight: 600,
            fontSize: '15px',
            color: theme.colorToken.text.neutral.normal
          }}
        >
          {date}
        </MvTypography>
      )}
    </Box>
  )
}
