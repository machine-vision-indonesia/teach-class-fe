import { Icon } from '@iconify/react'
import MuiDialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import MuiButton from '@mui/material/Button'

import { PropsWithChildren } from 'react'
import { Button } from 'src/components/atoms/button'
import Box from '@mui/material/Box'
import { CircularProgress } from '../circular-progress/CircularProgress'
import { PaperProps } from '@mui/material'

export interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  onOk?: () => void
  positiveLabel?: string
  negativeLabel?: string
  variant?: 'default' | 'default-button' | 'warning' | 'success' | 'danger'
  title?: string
  description?: string
  loading?: boolean
  PaperProps?: PaperProps
}

export const Modal = ({
  isOpen,
  onClose,
  variant,
  children,
  onOk,
  positiveLabel,
  negativeLabel,
  title,
  description,
  ...props
}: PropsWithChildren<ModalProps>) => {
  const { palette } = useTheme()
  const variantUsed = variant ?? 'default'
  const positifLabelUsed = positiveLabel ?? 'Submit'
  const negatifLabelUsed = negativeLabel ?? 'Cancel'

  const renderContent = () => {
    if (variantUsed.includes('default')) {
      return (
        <>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {title}
            </Typography>
            <Typography variant='labelMd'>{description}</Typography>
          </Box>

          {children}
        </>
      )
    } else if (variantUsed == 'success') {
      return (
        <Stack alignItems='center'>
          <Icon
            icon='material-symbols:check-circle-outline-rounded'
            fontSize='80px'
            color={(palette.success as any)?.[200]}
          />
          <Typography mt='24px' variant='h4'>
            Upload Successful
          </Typography>
          <Typography mt='2px' variant='labelMd'>
            Your document was success to upload !
          </Typography>
        </Stack>
      )
    } else if (variantUsed == 'warning') {
      return (
        <Box marginTop='36px' textAlign='center'>
          <Icon icon='tabler:alert-circle' fontSize='80px' color={(palette.warning as any)?.[200]} />
          <Typography mt='18px' variant='h4'>
            {title || 'Are you sure?'}
          </Typography>

          <Typography mt='2px' variant='labelMd'>
            {description || "You won't be able to revert this!"}
          </Typography>
        </Box>
      )
    } else if (variantUsed == 'danger') {
      return (
        <Box marginTop='36px' textAlign='center'>
          <Icon icon='mdi:clear-circle-outline' fontSize='80px' color={(palette.error as any)?.[200]} />
          <Typography mt='18px' variant='h4'>
            {title || 'Are you sure?'}
          </Typography>

          <Typography mt='2px' variant='labelMd'>
            {description || "You won't be able to revert this!"}
          </Typography>
        </Box>
      )
    }
  }

  const renderAction = () => {
    let color = 'primary'

    if (variantUsed == 'success') {
      color = 'success'
    } else if (variantUsed == 'warning') {
      color = 'warning'
    } else if (variantUsed == 'danger') {
      color = 'error'
    }

    if (variantUsed === 'danger') {
      return (
        <Box marginTop='31px' display='flex' alignItems='center' justifyContent='center' columnGap='10px'>
          <Button
            color='secondary'
            variant='outlined'
            content='textOnly'
            text={negativeLabel || 'Cancel'}
            sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
            onClick={onClose}
            disabled={props.loading}
          />

          <Button
            color='error'
            variant='contained'
            content='textOnly'
            text={positiveLabel || 'Yes, delete it'}
            sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
            onClick={onOk}
            disabled={props.loading}
            loading={props.loading}
          />
        </Box>
      )
    }

    if (variantUsed === 'warning') {
      return (
        <Box marginTop='31px' display='flex' alignItems='center' justifyContent='center' columnGap='10px'>
          <Button
            color='secondary'
            variant='outlined'
            content='textOnly'
            text={negativeLabel || 'Cancel'}
            sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
            onClick={onClose}
            disabled={props.loading}
          />

          <Button
            color='warning'
            variant='contained'
            content='textOnly'
            text={positiveLabel || 'Submit'}
            loading={props.loading}
            sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
            onClick={onOk}
            disabled={props.loading}
          />
        </Box>
      )
    }

    return (
      <DialogActions sx={{ px: '48px', pb: '40px' }}>
        <Stack width='100%' justifyContent='center' direction='row' spacing='10px'>
          <Button
            color='secondary'
            content='textOnly'
            text={negatifLabelUsed}
            variant={variantUsed != 'success' ? 'outlined' : 'contained'}
            onClick={() => onClose?.()}
          />

          {variantUsed != 'success' ? (
            <Button
              variant='contained'
              content='textOnly'
              text={positifLabelUsed}
              color={color as any}
              onClick={() => onOk?.()}
            />
          ) : null}
        </Stack>
      </DialogActions>
    )
  }

  return (
    <MuiDialog
      open={isOpen}
      onClose={(_, reason) => {
        if (props.loading && reason === 'backdropClick') {
          return
        }

        onClose?.()
      }}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      maxWidth='xs'
      scroll='body'
      PaperProps={{
        style: {
          maxWidth: '512px',
          width: '100%',
          height: '300px'
        }
      }}
      {...props}
    >
      <DialogContent sx={{ padding: '0 !important' }}>
        <Box display='flex' justifyContent='flex-end' position='absolute' right='5px' top='6px'>
          <IconButton size='small' onClick={onClose} sx={{ fontSize: '20px', padding: '6px' }} disabled={props.loading}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>

        {renderContent()}
      </DialogContent>

      {variantUsed != 'default' ? renderAction() : null}
    </MuiDialog>
  )
}
