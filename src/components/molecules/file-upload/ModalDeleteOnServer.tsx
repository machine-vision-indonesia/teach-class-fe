import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { Modal } from '../modal/components/Modal'
import { useTheme } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import client from 'src/client'
import { Button } from 'src/components/atoms'

type PropsType = {
  isOpen: string
  setModal: (id: string) => void
  liveUpdate: (idImg: string) => void
}

const ModalDeleteOnServer = ({ isOpen = '', setModal, liveUpdate }: PropsType) => {
  const { palette } = useTheme()
  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    setLoading(true)
    client.api
      .delete('/files/' + isOpen)
      .then(() => liveUpdate(isOpen))
      .catch(() => toast.error('Error deleting file'))
      .finally(() => {
        setLoading(false)
        setModal('')
      })
  }

  return (
    <Modal isOpen={isOpen !== ''} onClose={() => setModal('')}>
      <Box sx={{ width: '464px' }}>
        <Stack alignItems='center'>
          <Icon icon='mdi:clear-circle-outline' fontSize='80px' color={(palette.error as any)?.[200]} />
          <Typography mt='24px' variant='h4'>
            Are you sure delete this Image ?
          </Typography>
          <Typography mt='2px' variant='labelMd'>
            You won’t be able to revert this!
          </Typography>
        </Stack>
        <Stack width='100%' justifyContent='center' direction='row' spacing='10px' mt='30px'>
          <Button
            color='secondary'
            variant='contained'
            content='textOnly'
            text='Cancel'
            onClick={() => setModal('')}
            disabled={loading}
            loading={loading}
          />
          <Button
            variant='contained'
            content='textOnly'
            text='Yes, delete it'
            color='error'
            disabled={loading}
            onClick={handleDelete}
            loading={loading}
          />
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalDeleteOnServer
