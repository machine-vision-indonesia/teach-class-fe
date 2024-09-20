import {Card} from '@mui/material'
import {PropsModalImage} from "./ModalImage.type"
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from "@mui/material/Dialog";
import Icon from "../../../@core/components/icon";
import IconButton from '@mui/material/IconButton'

export const ModalImage = ({isOpen = false, onClose, imageUrl}: PropsModalImage) => {
  return (
    <Card
      sx={{
        backgroundColor: '#FFF',
        boxShadow: '0px 0px 8px 0px #00000029',
        borderRadius: '6px'
      }}
    >
      <Dialog open={isOpen} fullWidth maxWidth={'md'} aria-labelledby='customized-dialog-title'
              sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}>
        <DialogTitle id='customized-dialog-title' sx={{ p: 2.5 }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Icon icon='tabler:x' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img src={imageUrl} alt='image' width={'100%'} height={'100%'}/>
        </DialogContent>
      </Dialog>
    </Card>
  )

}
