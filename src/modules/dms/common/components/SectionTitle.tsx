import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, useTheme } from '@mui/material'
import { FC, ReactNode } from 'react'

interface ISectionTitle {
  title: string
  description?: string
  action?: ReactNode
}

const SectionTitle: FC<ISectionTitle> = ({ title, description, action }) => {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <MvTypography size='TITLE_SM' typeSize='PX' color={theme.colorToken.text.neutral.normal}>
          {title}
        </MvTypography>
        {description && (
          <MvTypography size='LABEL_MD_NORMAL' typeSize='PX' color={theme.palette.neutral[400]}>
            {description}
          </MvTypography>
        )}
      </Box>

      {action && <>{action}</>}
    </Box>
  )
}

export default SectionTitle
