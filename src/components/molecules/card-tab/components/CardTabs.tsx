import { useState } from 'react'
import { PropsCardTabs } from '../types/CardTabs.type'
import { Box, Card, CardActionArea, CardContent, Stack, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'

export const CardTabs = ({
  renderThumbnail,
  renderAction,
  activeSelected,
  width,
  title,
  description,
  variant = 'outlined',
  onClick
}: PropsCardTabs) => {
  const theme = useTheme()

  return (
    <Card
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: activeSelected ? theme.colorToken.background.primary.subtlest : 'transparent',
        border: activeSelected ? '1px solid' : '',
        borderColor: activeSelected ? theme.colorToken.border.primary.normal : theme.colorToken.border.neutral.normal,
        width: width ? width : '100%',
        minWidth: '300px',
        '&:hover': {
          borderColor: theme.colorToken.border.neutral.boldest
        }
      }}
    >
      <CardActionArea>
        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            {renderThumbnail}
            <Box>
              <MvTypography
                typeSize='PX'
                size='TITLE_XS'
                color={activeSelected ? theme.colorToken.link.primary.normal : theme.colorToken.text.neutral.normal}
              >
                {title}
              </MvTypography>
              <MvTypography typeSize='PX' size='BODY_SM_NORMAL' mt={2} color={theme.colorToken.text.neutral.subtle}>
                {description}
              </MvTypography>
            </Box>
            {renderAction}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
