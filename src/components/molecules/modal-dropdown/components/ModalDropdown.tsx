import { Button, Dialog, DialogContent, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { Modal as MoleculeModal } from 'src/components/molecules'
import { IModalDropdown } from '../types/modalDropdown.types'

const ModalDropdown = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  modalTitle = 'Are you sure to .....',
  modalInstruction = 'Please select one item below',
  modalFalseLabel = 'Cancel',
  modalTrueLabel = 'Submit',
  dropdownList = [
    {
      id: 1,
      label: 'item 1'
    },
    {
      id: 2,
      label: 'item 2'
    },
    {
      id: 3,
      label: 'item 3'
    }
  ],
  dropdownKey = 'id',
  dropdownLabel = 'label'
}: IModalDropdown) => {
  const theme = useTheme()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const handleSubmit = () => {
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
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            padding: '40px 50px !important'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon icon='tabler:alert-circle' fontSize='80px' color={(theme.palette.success as any)?.[200]} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '20px 24px 10px'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  textAlign: 'start'
                }}
              >
                <Typography variant='h4'>{modalTitle}</Typography>
              </div>
              <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
                You won't be able to revert this!
              </Typography>
            </div>
          </div>
          <Typography variant='subtitle1' sx={{ textAlign: 'start', paddingBottom: '26px', paddingTop: '12px' }}>
            {modalInstruction}
          </Typography>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedItem}
            style={{ width: '100%' }}
            placeholder='Select approver'
            onChange={event => setSelectedItem(event.target.value as string)}
          >
            {dropdownList?.map((item, index) => (
              <MenuItem key={index} value={item[dropdownKey]}>
                {item[dropdownLabel]}
              </MenuItem>
            ))}
          </Select>
          <Stack flexDirection={'row'} width={'100%'} gap={'16px'} mt={'26px'} justifyContent={'center'}>
            <Button variant='outlined' color='inherit' onClick={() => onClose()}>
              {modalFalseLabel}
            </Button>

            <Button variant='contained' disabled={isLoading || selectedItem === ''} onClick={handleSubmit}>
              {modalTrueLabel}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {openConfirmation && (
        <MoleculeModal
          loading={isLoading}
          isOpen={openConfirmation}
          type='confirmation'
          status='default'
          title={`Are you sure to continue the action?`}
          description='You won’t be able to revert this!'
          positiveLabel='Yes'
          negativeLabel='Cancel'
          onClose={() => {
            setOpenConfirmation(false)
          }}
          onOk={() => {
            if (onSubmit) {
              onSubmit(selectedItem)
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

export default ModalDropdown
