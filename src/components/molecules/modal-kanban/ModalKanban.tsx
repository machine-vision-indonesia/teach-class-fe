import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Icon } from '@iconify/react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import { ModalKanbanProps } from './ModalKanban.type'
import { useTheme } from '@mui/material/styles'

const InfoBox = ({ title, description }: any) => (
  <Box textAlign={'center'}>
    <Typography variant='h6' fontSize={'18px'}>
      {title}
    </Typography>
    <Typography variant='body1'>{description}</Typography>
  </Box>
)

const StatusBox = ({ backgroundColor, icon, iconColor, title, value }: any) => (
  <Box sx={{ display: 'flex', height: '50px', alignItems: 'center', gap: 1 }}>
    <Box
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: '180px',
        display: 'flex',
        width: '50px',
        height: '50px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Icon icon={icon} color={iconColor} fontSize={'30px'} />
    </Box>
    <Box>
      <Typography variant='h4'>{value}</Typography>
      <Typography variant='body1'>{title}</Typography>
    </Box>
  </Box>
)

export const ModalKanban: React.FC<ModalKanbanProps> = ({
  color = 'success',
  textBanner = 'A - 108',
  textHeader = [],
  mainContent,
  isOpen,
  onClose,
  isHeader = false,
  isFooter = false,
  isActionButtons = false
}) => {
  const { palette } = useTheme()

  return (
    <>
      <Dialog open={isOpen} scroll='paper' fullWidth maxWidth='md' sx={{ minWidth: '400px' }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
          <IconButton size='medium' onClick={onClose} sx={{ marginTop: '0.8rem', marginRight: '0.8rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
        </Box>

        <DialogContent sx={{}}>
          {/* Header start*/}
          {isHeader && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              {textHeader?.map((data, index) => (
                <InfoBox key={index} title={data.title} description={data.description} />
              ))}
            </Box>
          )}
          {/* Header end */}

          {/* Banner start */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: (palette[color] as any)?.[200],
              width: '100%',
              height: '60px'
            }}
          >
            <Typography variant='h2' color={'white'}>
              {textBanner}
            </Typography>
          </Box>
          {/* Banner end */}

          {/* Main content start */}
          <Box
            sx={{
              border: '1.2px solid #000',
              width: '100%',
              height: '100%',
              borderRadius: '5px',
              padding: '25px',
              marginY: '15px'
            }}
          >
            {mainContent}
          </Box>
          {/* Main content end */}

          {/* Footer start */}
          {isFooter && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}
            >
              <StatusBox
                backgroundColor='#D5F7F8'
                icon='mdi:clock-outline'
                iconColor='#12BDC7'
                title='Total'
                value='0'
              />
              <StatusBox
                backgroundColor='#FDE8DB'
                icon='mdi:format-list-bulleted'
                iconColor='#FA7322'
                title='Reject'
                value='0'
              />
              <StatusBox
                backgroundColor='#D9F2E4'
                icon='mdi:check-circle-outline'
                iconColor='#22B460'
                title='Good'
                value='0'
              />
              <StatusBox backgroundColor='#F9D9DE' icon='mdi:pause' iconColor='#DA1531' title='Total Loss' value='0' />
            </Box>
          )}
          {/* Footer end */}

          {/* Action button start */}
          {isActionButtons && (
            <DialogActions sx={{ width: ' 100%', paddingBottom: '0.5rem' }}>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: 2, marginX: 0 }}>
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={onClose}
                  sx={{ width: '100%', backgroundColor: '#ffffff' }}
                >
                  Cancel
                </Button>
                <Button variant='contained' color='error' onClick={onClose} sx={{ width: '100%' }}>
                  Close
                </Button>
              </Box>
            </DialogActions>
          )}
          {/* Action button end */}
        </DialogContent>
      </Dialog>
    </>
  )
}
