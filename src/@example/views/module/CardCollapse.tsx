import { useState } from 'react'
import { Box, Card, CardContent, Collapse, IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Button } from 'src/components/atoms/button/Button'
import CardModuleItem from './CardModuleItem'

const CardCollapse = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Card sx={{ minWidth: 275, my: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton onClick={() => setOpen(!isOpen)} aria-label='expand' size='small'>
              <Icon icon='tabler:grip-vertical' fontSize='1.25rem' />
            </IconButton>
            <Box sx={{ ml: 3 }}>
              <IconButton onClick={() => setOpen(!isOpen)} aria-label='expand' size='small'>
                {isOpen ? (
                  <Icon icon='tabler:chevron-up' fontSize='1.8rem' color='black' />
                ) : (
                  <Icon icon='tabler:chevron-down' fontSize='1.8rem' color='black' />
                )}
              </IconButton>
            </Box>
            <Box sx={{ mt: '10px', ml: 3 }}>
              <Typography variant='subtitle1' color={'InfoText'}>
                General
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setOpen(!isOpen)} aria-label='expand' size='small'>
            <Icon icon='tabler:dots-vertical' fontSize='1.25rem' />
          </IconButton>
        </Box>
      </CardContent>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <Box sx={{ px: '1.5rem', pb: '2rem' }}>
          <CardModuleItem />
          <Button variant='outlined' size='small' sx={{ columnGap: 2, ml: 2, mt: '1.5rem' }}>
            <Icon icon='tabler:plus' fontSize='1rem' />
            Add Cluster
          </Button>
        </Box>
      </Collapse>
    </Card>
  )
}

export default CardCollapse
