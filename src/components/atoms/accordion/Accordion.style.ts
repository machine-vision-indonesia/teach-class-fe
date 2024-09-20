import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
  styled
} from '@mui/material'

export const AccordionCustom = styled(MuiAccordion)<AccordionProps & { bgColor?: string }>(
  ({ theme, bgColor }) => ({
    margin: 0,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none !important',
    border:
      theme.palette.mode === 'light'
        ? `1px solid ${theme.palette.grey[300]}`
        : `1px solid ${theme.palette.divider}`,
    '&:before': { display: 'none' },
    '&.Mui-expanded': { margin: 'auto' },
    '&:first-of-type': {
      '& .MuiButtonBase-root': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
      }
    },
    '&:last-of-type': {
      '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
      }
    },
    backgroundColor: bgColor // Set background color dynamically
  })
)

// Styled component for AccordionSummary component
export const AccordionSummaryCustom = styled(AccordionSummary)<
  AccordionSummaryProps & { bgColor?: string }
>(({ theme, bgColor }) => ({
  marginBottom: -1,
  padding: theme.spacing(0, 2),
  transition: 'min-height 0.15s ease-in-out',
  '&.Mui-expanded': {
    backgroundColor: bgColor || theme.palette.action[theme.palette.mode === 'light' ? 'hover' : 'selected']
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    '&.Mui-expanded': {
      '& .summary-icon': {},
      '& .summary-title': { fontWeight: 700 }
    }
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

// Styled component for AccordionDetails component
export const AccordionDetailsCustom = styled(AccordionDetails)<AccordionDetailsProps & { bgColor?: string }>(
  ({ theme, bgColor }) => ({
    padding: `${theme.spacing(4)} !important`,
    backgroundColor: bgColor || theme.palette.action[theme.palette.mode === 'light' ? 'hover' : 'selected']
  })
)
