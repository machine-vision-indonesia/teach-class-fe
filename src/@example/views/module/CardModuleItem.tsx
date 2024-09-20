import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

const CardModuleItem = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box sx={{ p: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={() => setIsOpen(!isOpen)} aria-label='expand' size='small'>
          <Icon icon='tabler:grip-vertical' fontSize='1rem' />
        </IconButton>
        <Box sx={{ ml: 3 }}>
          <IconButton onClick={() => setIsOpen(!isOpen)} aria-label='expand' size='small'>
            {isOpen ? (
              <Icon icon='tabler:chevron-up' fontSize='1.4rem' color='black' />
            ) : (
              <Icon icon='tabler:chevron-down' fontSize='1.4rem' color='black' />
            )}
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, ml: 3 }}>
          <Typography variant='subtitle2'>General</Typography>
        </Box>
      </Box>
      <IconButton onClick={() => setIsOpen(!isOpen)} aria-label='expand' size='small'>
        <Icon icon='tabler:dots-vertical' fontSize='1rem' />
      </IconButton>
    </Box>
  )
}

export default CardModuleItem
