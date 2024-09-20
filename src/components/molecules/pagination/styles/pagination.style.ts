import { PaginationItem as MuiPaginationItem, styled } from '@mui/material'

export const PaginationItem = styled(MuiPaginationItem)<{
  size: 'small' | 'medium' | 'large'
  shape: 'circular' | 'rounded'
}>(({ theme, size, shape }) => {
  return {
    ...(shape === 'circular' && {
      borderRadius: '50%'
    }),
    ...(shape === 'rounded' && {
      borderRadius: '4px'
    }),
    '&.Mui-selected': {
      backgroundColor: theme.colorToken.background.primary.normal,
      color: theme.colorToken.text.neutral.inverted,
      '&:hover': {
        backgroundColor: theme.colorToken.background.primary.hover,
        color: theme.colorToken.text.neutral.inverted
      }
    },
    '&:hover': {
      backgroundColor: theme.colorToken.background.primary.hover,
      color: theme.colorToken.text.neutral.inverted
    },
    '&:active': {
      backgroundColor: theme.colorToken.background.primary.normal,
      color: theme.palette.primary.contrastText
    },
    ...(size === 'small' && {
      fontSize: '12px',
      padding: '4px 8px'
    }),
    ...(size === 'medium' && {
      fontSize: '14px',
      padding: '6px 12px'
    }),
    ...(size === 'large' && {
      fontSize: '16px',
      padding: '8px 16px'
    })
  }
})
