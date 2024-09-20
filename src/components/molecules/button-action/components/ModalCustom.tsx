import { MvTypography } from '@/components/atoms/mv-typography'
import { Dialog, DialogContent } from '@mui/material'
import { useState } from 'react'
import { Modal as MoleculeModal } from 'src/components/molecules'
import { IModalCustom } from '../types/modalCustom.types'

const ModalCustom = ({ isOpen, onClose, onSubmit, isLoading = false, modalTitle, renderModal }: IModalCustom) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [customPayload, setCustomPayload] = useState({})

  const submitForm = (data: any) => {
    setCustomPayload(data)
    setOpenConfirmation(true)
  }

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        scroll='body'
        onClose={onClose}
        PaperProps={{
          style: {
            maxWidth: '580px'
          }
        }}
      >
        <MvTypography
          sx={{ textAlign: 'center', my: 5 }}
          size='TITLE_MD'
          typeSize='PX'
        >
          {modalTitle}
        </MvTypography>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {renderModal({ submitForm, onClose, isLoading })}
        </DialogContent>
      </Dialog>

      {openConfirmation && (
        <MoleculeModal
          loading={isLoading}
          isOpen={openConfirmation}
          type='confirmation'
          status='default'
          title={`Are you sure to continue ${modalTitle}?`}
          description='You won’t be able to revert this!'
          positiveLabel='Yes'
          negativeLabel='Cancel'
          onClose={() => {
            setOpenConfirmation(false)
          }}
          onOk={() => {
            if (onSubmit) {
              onSubmit({ ...customPayload })
            }
            setOpenConfirmation(false)
          }}
          closeable={false}
          position='left'
        />
      )}
    </>
  )
}

export default ModalCustom
