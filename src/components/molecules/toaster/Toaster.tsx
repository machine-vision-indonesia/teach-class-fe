import { Box } from '@mui/material'
import { CSSProperties } from 'react'
import toast from 'react-hot-toast'
import { Alert } from 'src/components/atoms/alert/Alert'

type ToastVariants = {
  success: string
  error: string
}

type ToastMessages = {
  success: string;
  error: string;
};


type ToastActionTypes = {
  create: string
  edit: string
  delete: string
}

type ToasterProps = {
  variant: keyof ToastVariants
  actionType: keyof ToastActionTypes
  onClose: () => void,
  messages: ToastMessages
}

const VARIANT_TITLE: ToastVariants = {
  success: 'Success',
  error: 'Failed'
}

const VARIANT_ICON: ToastVariants = {
  success: 'mdi:check',
  error: 'mdi:close-circle-outline'
}

const TOAST_MESSAGES: Record<keyof ToastActionTypes, ToastMessages> = {
  create: {
    success: 'New data has been created',
    error: 'Data has failed to created',
  },
  edit: {
    success: 'Data updated has been saved',
    error: 'Data has failed to saved',
  },
  delete: {
    success: 'Success to delete data',
    error: 'Failed to delete data',
  },
};

const RESET_STYLE: CSSProperties = {
  padding: 0,
  background: 'none',
  boxShadow: 'none'
}

export default function Toaster({
                                          variant,
                                          actionType,
                                          onClose,
                                          messages = TOAST_MESSAGES[actionType]
                                        }: ToasterProps) {
  return (
    <Box style={{ background: 'white', borderRadius: '6px' }}>
      <Alert
        icon={VARIANT_ICON[variant]}
        title={VARIANT_TITLE[variant]}
        variant='contained'
        color={variant}
        content={messages[variant]}
        onClose={onClose}
      />
    </Box>
  )
}

Toaster.show = function (props: Omit<ToasterProps, 'onClose'>) {
  const toastId = toast(
    <Toaster {...props} onClose={() => toast.dismiss(toastId)} />,
    { style: RESET_STYLE }
  )
}
