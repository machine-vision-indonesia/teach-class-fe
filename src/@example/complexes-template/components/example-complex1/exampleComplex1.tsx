import MuiButton, { type ButtonProps } from '@mui/material/Button'
import React from 'react'

export const ButtonExample = (props: ButtonProps) => {
  return <MuiButton sx={{ color: props.variant == 'contained' ? 'white' : undefined }} size='small' {...props} />
}
