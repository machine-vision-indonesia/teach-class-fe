import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import React from 'react'
import { SectionGroupProps } from '../types/SectionGroup.type'
import { MvTypography } from '@/components/atoms/mv-typography'
import { useTheme } from '@mui/material'
import { getStyles } from '../utils'

export const SectionGroup = ({
  title,
  squareLeft,
  squareRightChildrenLeft,
  squareRightChildrenCenter,
  squareRightChildrenRight,
  children,
  color = 'default',
  ...props
}: SectionGroupProps) => {
  const theme = useTheme()
  const hasChildren = React.Children.count(children) > 0;

  const { backgroundSection, borderSection } = getStyles(color, theme)

  return (
    <Box {...props} sx={{ width: '100%', borderRadius: '6px', border: hasChildren ? '1px solid' : 'none', borderColor: hasChildren ? borderSection : '' }}>
      <Box
        sx={{
          background: backgroundSection,
          padding: 4,
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: borderSection
        }}
      >
        <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center'>
          <MvTypography typeSize='PX' size='TITLE_XS' color={theme.colorToken.text.neutral.normal}>
            {title}
          </MvTypography>
          <Stack direction='row' alignItems='center' spacing={4}>
            <Box>{squareLeft}</Box>
            <Box>
              {squareRightChildrenLeft}
              {squareRightChildrenCenter}
              {squareRightChildrenRight}
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box p={5}>
        {children}
      </Box>
    </Box>
  )
}

export default SectionGroup
