import { Box, Snackbar } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { toasterDataAtom } from '../stores/atoms'
import { Toast } from '@/components/atoms/toast'

const Toaster = () => {
  const [toasterData, setToasterData] = useAtom(toasterDataAtom)

  return (
    <Snackbar
      open={toasterData !== undefined}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={5000}
      onClose={() => setToasterData(undefined)}
    >
      <Box>{toasterData && <Toast {...toasterData} onClose={() => setToasterData(undefined)} />}</Box>
    </Snackbar>
  )
}

export default Toaster
