import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiCircularProgress, { type CircularProgressProps } from '@mui/material/CircularProgress'
import React from 'react'

interface PropsCircularProgress {
  withLabel?: boolean
}

export const CircularProgress = ({ withLabel, ...props }: CircularProgressProps & PropsCircularProgress) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <MuiCircularProgress {...props} />
      {withLabel && (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant='labelSm' component='div'>
            {Math.round(props.value as number)}%
          </Typography>
        </Box>
      )}
    </Box>
  )
}
