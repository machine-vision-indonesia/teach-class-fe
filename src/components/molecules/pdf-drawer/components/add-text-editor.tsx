import { Icon } from '@iconify/react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { Button } from 'src/components/atoms'

export default function AddTextEditor(props: {
  addAnnotationItem: (props: { type: 'checklist' | 'text' | 'draw'; text?: string }) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [textValue, setTextValue] = useState('')

  function onSave() {
    props.addAnnotationItem({
      type: 'text',
      text: textValue
    })
    setOpen(false)
  }

  return (
    <Box>
      <Button
        variant='plain'
        color='primary'
        content='iconText'
        icon='tabler:clear-formatting'
        text='Text'
        onClick={() => setOpen(true)}
        disabled={props?.disabled}
        sx={{
          paddingX: 4
        }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Text Section</DialogTitle>
        <DialogContent>
          <TextField
            variant='standard'
            label='Type your text here...'
            onChange={event => {
              setTextValue(event.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='solid' content='textOnly' text='Cancel' color='secondary' onClick={() => setOpen(false)} />
          <Button variant='solid' content='textOnly' text='Save' color='success' onClick={onSave} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}
