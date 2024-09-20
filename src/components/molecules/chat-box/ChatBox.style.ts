import { IconButton, TextField, Theme, styled } from '@mui/material'

export const ChatBoxField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    '.MuiOutlinedInput-input': {
      padding: '7px 10px'
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider
    }
  }
}))

export const ChatBoxAttachmentButton = styled(IconButton)(({ theme, disabled }) => ({
  padding: 0,
  borderRadius: 4,
  height: '30px',
  width: '30px',
  border: `1px solid ${disabled ? theme.palette.divider : theme.palette.primary.main}`
}))

export const chatBubbleStyles = {
  bubbleContainer: {
    padding: '8px 10px',
    height: 'max-content'
  },
  attachmentContainer: {
    cursor: 'pointer',
    borderRadius: '4px',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'flex-start',
    padding: '4px',
    mb: '4px',
    background: (theme: Theme) => theme.palette.background.paper
  },
  attachmentIcon: {
    fontSize: 24,
    width: 24,
    height: 24
  },
  dateText: {
    mt: '6px',
    color: (theme: Theme) => theme.palette.text.primary,
    fontSize: '12px'
  }
}

export const chatStatusStyles = {
  statusNotificationContainer: {
    position: 'relative',
    textAlign: 'center'
  },
  notificationText: {
    fontSize: 14,
    display: 'inline-block',
    textTransform: 'capitalize',
    padding: '0 16px',
    position: 'relative',
    zIndex: 1
  },
  statusText: {
    fontSize: 14,
    color: (theme: Theme) => theme.palette.accent.main
  }
}

export const chatBoxStyles = {
  chatBoxContainer: {
    p: '14px 18px',
    background: (theme: Theme) => theme.palette.navbarHeader,
    borderRadius: 2
  },
  chatBoxContent: {
    p: 3,
    background: (theme: Theme) => (theme.palette.mode === 'light' ? '#FEFEFE' : theme.palette.background.paper),
    borderRadius: 2
  },
  chatBoxScrolledContent: {
    flexDirection: 'column',
    height: '365px',
    width: '100%',
    paddingRight: 2,
    overflowY: 'scroll'
  },
  footerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '12px'
  },
  footerButtonSection: {
    alignItems: 'center',
    pt: '3px'
  },
  sendButton: {
    height: '32px',
    padding: '8px 16px'
  },
  container: {
    height: '365px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    px: '10px'
  }
}
