import { CircularProgress, Box } from '@mui/material'
import React from 'react'
import SpinnerProps from '../types/spinner.types'
import { COLOR_VARIANT } from '../constants/spinner.constant'

/**
 * Renders a spinner component with the specified color and size.
 *
 * @param {string} color - The color of the spinner.
 * @param {string} size - The size of the spinner (default is '100%').
 * @return {JSX.Element} The rendered spinner component.
 */
const Spinner: React.FC<SpinnerProps> = ({ color, size = '100%' }) => {
  const dataColor = COLOR_VARIANT[color] || COLOR_VARIANT.default
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress
        size={'90%'}
        sx={{
          color: dataColor
        }}
      />
    </Box>
  )
}

export default Spinner
