import { Switch as MuiSwitch, styled } from '@mui/material'
import { SwitchCustomProps } from '../types/switch.types'

// Extend the styled component with the new props
export const SwitchCustom = styled(MuiSwitch)<SwitchCustomProps>(({ color = 'primary', colorPalette }) => ({
  width: 42,
  height: 26,
  marginRight: 8,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: colorPalette?.primary.contrastText,
      '& + .MuiSwitch-track': {
        backgroundColor: color,
        opacity: 1,
        border: 0
      },
      '& .MuiSwitch-thumb': {
        color: colorPalette?.primary.contrastText
      }
    },
    '&.Mui-disabled': {
      '& + .MuiSwitch-track': {
        opacity: 0.5
      },
      '& .MuiSwitch-thumb': {
        color: colorPalette?.primary.contrastText
      }
    },
    '&.Mui-disabled:not(.Mui-checked)': {
      '& + .MuiSwitch-track': {
        backgroundColor: colorPalette?.neutral['100'],
        opacity: 0.5
      },
      '& .MuiSwitch-thumb': {
        opacity: 0.5
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    color: colorPalette?.neutral['100'],
    width: 15,
    height: 15,
    marginTop: 3,
    marginLeft: 3,
    '&.Mui-disabled': {
      opacity: 0.5,
      color: colorPalette?.primary.contrastText
    },
    '&:hover': {
      color: 'transparent'
    }
  },
  '& .MuiSwitch-track': {
    borderRadius: 13,
    backgroundColor: colorPalette?.primary.contrastText,
    opacity: 1,
    border: `1px solid ${colorPalette?.neutral['100']}`
  }
}))
