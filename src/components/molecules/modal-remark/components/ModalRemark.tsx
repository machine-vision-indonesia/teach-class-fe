import { MvTypography } from '@/components/atoms/mv-typography'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { Box, Button, Dialog, DialogContent, Stack, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Modal as MoleculeModal } from 'src/components/molecules'
import { confirmationIconMapping } from '../../modal/constans/common'
import { IFormData, IModalRemark } from '../types/modalRemark.types'
import { remarkSchema } from '../utils/modalRemarkSchema'

const ModalRemark = ({
  isOpen,
  confirmationStatus,
  onClose,
  onSubmit,
  isLoading = false,
  modalTitle = 'Remark',
  modalDescription
}: IModalRemark
) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [remark, setRemark] = useState('')

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(remarkSchema)
  })

  const submitForm = (data: IFormData) => {
    setRemark(data.remark)
    setOpenConfirmation(true)
  }


  const renderIcon = () => {
    if (!confirmationStatus) {
      return undefined
    }
    const theme = useTheme()
    const iconName = confirmationIconMapping[confirmationStatus]

    const iconColor = {
      default: theme.colorToken.icon.primary.normal,
      danger: theme.colorToken.icon.danger.normal,
      warning: theme.colorToken.icon.warning.normal,
      scan: theme.colorToken.icon.primary.normal,
      leave: theme.colorToken.icon.primary.normal,
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${confirmationStatus}.100`,
          width: '64px',
          height: '64px',
          borderRadius: '64px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${confirmationStatus}.300`,
            width: '40px',
            height: '40px',
            borderRadius: '40px'
          }}
        >

          {/* 
          theme.colorToken.background.neutral.subtle


          */}


          <Icon
            icon={iconName}
            fontSize={'40px'}
            color={
              ['default', 'scan', 'leave'].includes(confirmationStatus) ? theme.colorToken.icon.primary.normal : iconColor[confirmationStatus]
            }
          />
        </Box>
      </Box>
    )
  }

  const renderUpperContent = () => {
    return (
      <>
        <Stack direction='row' justifyContent='flex-start' alignItems='center' gap={4} sx={{ width: 1 }}>
          {renderIcon()}
          <Stack alignItems='start'>
            <MvTypography
              size='TITLE_MD'
              typeSize='PX'
              textAlign={'center'}
            >
              {modalTitle}
            </MvTypography>
            <MvTypography
              mt='2px'
              size='LABEL_MD_NORMAL'
              typeSize='PX'
            >
              {modalDescription}
            </MvTypography>
          </Stack>
        </Stack>
      </>
    )
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
            alignItems: 'center',
            padding: '40px 50px !important'
          }}
        >
          {/* <Typography variant='h3' sx={{ textAlign: 'center', paddingBottom: '26px' }}>
            {modalTitle}
          </Typography> */}
          {renderUpperContent()}
          <form id='remark-form' style={{ paddingTop: '20px', width: '100%' }}>
            <Controller
              name='remark'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <>
                  <MvTypography size='TITLE_XS' typeSize='PX' style={{ marginBottom: '4px' }}>
                    Remark
                  </MvTypography>
                  <TextField
                    {...field}
                    placeholder='Input Remark'
                    fullWidth
                    multiline
                    rows={4}
                    variant='outlined'
                    error={!!errors.remark}
                    helperText={errors.remark?.message}
                    sx={{
                      '& .MuiInputBase-root': {
                        p: '9px 14px'
                      },
                      '& .MuiFormHelperText-root': {
                        mx: 0
                      }
                    }}
                  />
                </>
              )}
            />
            <Stack flexDirection={'row'} gap={'16px'} mt={'26px'} justifyContent={'flex-end'}>
              <Button variant='outlined' color='primary' onClick={() => onClose()}>
                Cancel
              </Button>

              <Button variant='contained' disabled={isLoading} onClick={handleSubmit(submitForm)}>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      {openConfirmation && (
        <MoleculeModal
          loading={isLoading}
          isOpen={openConfirmation}
          type='confirmation'
          status={confirmationStatus}
          title='Are you sure to continue the action?'
          description='You won’t be able to revert this!'
          positiveLabel='Yes'
          negativeLabel='Cancel'
          onClose={() => {
            setOpenConfirmation(false)
          }}
          onOk={() => {
            if (onSubmit) {
              onSubmit(remark)
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

export default ModalRemark
