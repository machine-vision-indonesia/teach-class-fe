import { Box, useTheme } from '@mui/material'
import { FC, ReactNode } from 'react'

interface IContainerBox {
  flexDirection?: string
  children: ReactNode
  padding?: string
  gap?: string
}

const ContainerBox: FC<IContainerBox> = ({ flexDirection, children, padding = '16px', gap = '16px' }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: flexDirection ? flexDirection : 'column'
      }}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      bgcolor={theme.colorToken.background.neutral.normal}
      borderRadius={'8px'}
      width={'100%'}
      p={padding}
      gap={gap}
    >
      {children}
    </Box>
  )
}

export default ContainerBox
