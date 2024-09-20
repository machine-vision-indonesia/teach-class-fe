/** React imports */
import { PropsWithChildren } from 'react'

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
import { BaseModalProps, BaseModalType, ConfirmationStatus, FeedbackStatus } from '../types/Modal.type'

/** Constant imports */
import { feedbackIconMapping, confirmationIconMapping, buttonColorStatusMapping } from '../constans/common'

/**
 * Modal Component
 *
 * A versatile modal component that can be customized for various use cases such as confirmation, feedback, and default dialogs.
 *
 * @param {PropsWithChildren<BaseModalProps<T>>} props - The props for the Modal component.
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
 * <Modal
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
export const Modal = <T extends BaseModalType>({
  isOpen = false,
  onClose,
  onOk,
  positiveLabel = 'Submit',
  negativeLabel = 'Cancel',
  title,
  description = '',
  position = 'left',
  color = 'primary',
  closeable = true,
  maxWidth,
  scroll,
  children,
  renderAction = true,
  loading = false,
  positionActionButton = 'right',
  size = 'medium',
  type = 'default',
  status
}: PropsWithChildren<BaseModalProps<T>>) => {
  const { palette } = useTheme()
  const colorStatus = (status as FeedbackStatus) || (status as ConfirmationStatus)

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
    const iconName =
      type === 'feedback'
        ? feedbackIconMapping[status as FeedbackStatus]
        : confirmationIconMapping[status as ConfirmationStatus]

    if (!iconName || type === 'default') return null

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${colorStatus}.50`,
          width: '64px',
          height: '64px',
          borderRadius: '64px',
          minWidth: '64px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${colorStatus}.200`,
            width: '40px',
            height: '40px',
            borderRadius: '40px'
          }}
        >
          <Icon icon={iconName} fontSize={type === 'feedback' ? '37px' : '40px'} color={palette[colorStatus]?.main} />
        </Box>
      </Box>
    )
  }

  const renderContent = () => {
    return (
      <>
        <Stack direction={position === 'left' ? 'row' : 'column'} justifyContent={position} alignItems='center' gap={2}>
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
        {children}
      </>
    )
  }

  const renderButtonAction = () => {
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
          color={type === 'confirmation' ? buttonColorStatusMapping[colorStatus] : 'primary'}
          sx={{
            height: '36px'
          }}
          text={loading ? 'Loading...' : positiveLabel}
          onClick={() => onOk?.()}
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

      <DialogContent sx={{ mt: closeable ? 3 : 0 }}>{renderContent()}</DialogContent>
      {renderAction && <DialogActions>{renderButtonAction()}</DialogActions>}
    </Dialog>
  )
}
