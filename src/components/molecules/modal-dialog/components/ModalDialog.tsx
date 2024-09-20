/** React imports */
import { PropsWithChildren, useEffect, useState } from 'react'

/**
 * validator import
 */
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

/** Iconify imports */
import { Icon } from '@iconify/react'

/** MUI imports */
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

/** Component imports */
import { Button } from 'src/components/atoms'

/** Type imports */
import { ColorVariant, ModalDialogProps, StatusVariant } from '../types/ModalDialog.type'
import { confirmationIconMapping, feedbackIconMapping } from '../constans/common'

/**
 * ModalDialog Component
 *
 * A versatile modal component that can be customized for various use cases such as confirmation, feedback, and default dialogs.
 *
 * @param {ModalDialogProps} props - The props for the ModalDialog component.
 * @param {boolean} [props.isOpen=false] - Controls whether the modal is open.
 * @param {() => void} props.onClose - Callback function to be called when the modal is closed.
 * @param {() => void} props.onOk - Callback function to be called when the positive action button is clicked.
 * @param {string} [props.positiveLabel='Submit'] - Label for the positive action button.
 * @param {string} [props.negativeLabel='Cancel'] - Label for the negative action button.
 * @param {string} props.title - Title of the modal.
 * @param {string} [props.description=''] - Description text for the modal.
 * @param {'left' | 'center' | 'right'} [props.position='left'] - Position of the content inside the modal.
 * @param {'primary' | 'secondary' | 'default'} [props.color='primary'] - Color theme of the modal.
 * @param {boolean} [props.closeable=true] - Determines if the modal can be closed by clicking an 'X' button.
 * @param {string} [props.icon='confirm'] - Icon type to be displayed in the modal.
 * @param {string} props.maxWidth - Maximum width of the modal.
 * @param {'paper' | 'body' | 'unset'} props.scroll - Determines the scroll behavior for the modal.
 * @param {ReactNode} props.children - Children elements to be rendered inside the modal.
 * @param {boolean} [props.renderAction=true] - Determines if the action buttons should be rendered.
 * @param {boolean} [props.loading=false] - Indicates if the modal is in a loading state.
 * @param {'right' | 'center'} [props.positionActionButton='right'] - Position of the action buttons.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the modal.
 * @param {'default' | 'confirmation' | 'feedback'} [props.type='default'] - Type of the modal.
 * @param {FeedbackStatus | ConfirmationStatus} props.status - Status of the modal for determining icon and color.
 *
 * @returns {JSX.Element} The rendered modal component.
 *
 * @example
 * ```tsx
 * <ModalDialog
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onOk={handleOk}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   type="confirmation"
 *   status="danger"
 * />
 * ```
 */
export const ModalDialog = ({
  isOpen = false,
  onClose,
  onOk,
  positiveLabel = 'Submit',
  negativeLabel = 'Cancel',
  title,
  description = '',
  position = 'left',
  closeable = true,
  icon,
  scroll,
  children,
  renderAction = true,
  loading = false,
  positionActionButton = 'right',
  size = 'medium',
  typeVariant = 'confirmation',
  statusVariant = 'primary',
  renderContent = () => <></>,
  contentValidationSchema
}: PropsWithChildren<ModalDialogProps>) => {
  const { colorToken } = useTheme()
  const [value, setValue] = useState({})

  const formControl = useForm({
    mode: 'all',
    resolver: yupResolver(contentValidationSchema || yup.object())
  })

  useEffect(() => {
    const subscription = formControl.watch(value => {
      setValue(value)
    })
    return () => subscription.unsubscribe()
  }, [formControl.watch])

  const onSubmit = () => {
    onOk?.(value)
  }

  const handleStyleDialog = () => {
    let fixedMaxWidth = '580px'

    if (size === 'small') fixedMaxWidth = '360px'
    if (size === 'large') fixedMaxWidth = '800px'

    const style = {
      '& .MuiDialog-paper': {
        maxWidth: fixedMaxWidth,
        margin: 'auto'
      }
    }

    return style
  }

  const handleStyleActionBtn = () => {
    const style = {
      justifyContent: !positionActionButton || positionActionButton === 'right' ? 'flex-end' : 'center'
    }

    return style
  }

  const renderIcon = () => {
    let iconName: string =
      typeVariant === 'confirmation'
        ? confirmationIconMapping[statusVariant as keyof typeof confirmationIconMapping]
        : feedbackIconMapping[statusVariant as keyof typeof feedbackIconMapping]

    if (icon) {
      iconName = icon
    }

    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${statusVariant}.50`,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            mr: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: `${statusVariant}.200`,
              width: '40px',
              height: '40px',
              borderRadius: '50%'
            }}
          >
            <Icon
              icon={iconName}
              fontSize={typeVariant === 'feedback' ? '37px' : '40px'}
              color={colorToken.icon[statusVariant]?.normal}
            />
          </Box>
        </Box>
      </Box>
    )
  }

  const renderButtonAction = () => {
    function mapStatusToColor(status: StatusVariant): ColorVariant {
      const statusMap = {
        danger: 'error',
        primary: 'primary',
        success: 'success',
        warning: 'warning',
        info: 'info'
      }

      return (statusMap[status] as ColorVariant) || status
    }
    return (
      <Stack width='100%' sx={handleStyleActionBtn()} direction='row' spacing='10px'>
        <Button
          content='textOnly'
          text={negativeLabel}
          color='primary'
          variant='outlined'
          sx={{ height: '36px' }}
          onClick={() => onClose?.()}
        />
        <Button
          variant='solid'
          content='textOnly'
          disabled={loading}
          color={typeVariant === 'confirmation' ? mapStatusToColor(statusVariant) : 'primary'}
          text={positiveLabel}
          loading={loading}
          onClick={() => {
            if (contentValidationSchema) {
              formControl.trigger().then(isValid => {
                if (isValid) {
                  formControl.handleSubmit(onSubmit)()
                } else {
                  console.log('Form is invalid')
                }
              })
            }

            if (!contentValidationSchema) {
              formControl.handleSubmit(onSubmit)()
            }
          }}
        />
      </Stack>
    )
  }

  return (
    <Dialog open={isOpen} scroll={scroll} fullWidth sx={handleStyleDialog()}>
      {closeable && (
        <IconButton size='small' sx={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }} onClick={onClose}>
          <Icon icon='tabler:x' />
        </IconButton>
      )}

      <DialogContent sx={{ mt: closeable ? 3 : 0 }}>
        <Stack direction={position === 'left' ? 'row' : 'column'} justifyContent={position} alignItems='center' gap={1}>
          {renderIcon()}
          <Stack alignItems={position === 'center' ? position : 'start'}>
            <Typography variant='h5' textAlign={'center'}>
              {title}
            </Typography>
            <Typography mt='2px' variant='labelMd'>
              {description}
            </Typography>
          </Stack>
        </Stack>
        <Box my={5}>{renderContent({ formControl })}</Box>
      </DialogContent>
      {renderAction && <DialogActions>{renderButtonAction()}</DialogActions>}
    </Dialog>
  )
}
