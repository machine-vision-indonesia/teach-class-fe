import TextField from '@mui/material/TextField'
import { styled } from '@mui/material'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '8px',
  borderWidth: '0px',
  borderColor: theme.colorToken.border.neutral?.bold,
  borderStyle: 'solid',
  outline: 'none',
  '&:hover': {
    borderColor: theme.colorToken.border.primary.normal
  }
}))

export const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  alignItems: 'center'
})
