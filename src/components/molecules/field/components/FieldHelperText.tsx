import React, { useContext } from 'react'
import { FormHelperText } from '@mui/material'
import { FieldContext } from '../constants'

export const FieldHelperText: React.FC = () => {
  const { helperText, isCustomHelperText } = useContext(FieldContext)
  return isCustomHelperText ? <FormHelperText>{helperText}</FormHelperText> : null
}
