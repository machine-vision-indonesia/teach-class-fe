import React, { useEffect, useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { Button } from 'src/components/atoms'
import { ModalDialog } from '../components/ModalDialog'
import { ModalDialogProps } from '../types/ModalDialog.type'
import { MvTypography } from '@/components/atoms/mv-typography'
import { TextField } from '@mui/material'

const ModalDialogComponents = (props: ModalDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button content='textOnly' variant='solid' onClick={() => setOpen(true)} text={props.title as string} />
      <ModalDialog {...props} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default {
  title: 'Components/Molecules/ModalDialog',
  component: ModalDialog
} as Meta<typeof ModalDialog>

const Template: StoryFn<typeof ModalDialog> = args => <ModalDialogComponents {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'This is ModalDialog',
  description: 'This is description of modal',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'confirmation',
  statusVariant: 'primary'
}

export const feedbackSucces = Template.bind({})
feedbackSucces.args = {
  title: 'Feedback success',
  description: 'This is description of modal Feedback success',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'feedback',
  statusVariant: 'success'
}

export const feedbackWarning = Template.bind({})
feedbackWarning.args = {
  title: 'Feedback Warning',
  description: 'This is description of modal Feedback Warning',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'feedback',
  statusVariant: 'warning'
}

export const feedbackDanger = Template.bind({})
feedbackDanger.args = {
  title: 'Feedback Danger',
  description: 'This is description of modal Feedback Danger',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'feedback',
  statusVariant: 'danger'
}

export const feedbackDangerWithRemark = Template.bind({})
feedbackDangerWithRemark.args = {
  title: 'Feedback Danger with remark',
  description: 'This is description of modal Feedback Danger with remark',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'feedback',
  statusVariant: 'danger',
  contentValidationSchema: yup.object().shape({
    remark: yup.string().required('This field is required.').min(1).default('')
  }),
  renderContent(renderContent) {
    return (
      <>
        <Controller
          name='remark'
          control={renderContent.formControl.control}
          defaultValue=''
          render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => (
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
                error={!!renderContent.formControl.formState.errors.remark}
                helperText={renderContent.formControl.formState.errors.remark?.message}
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
      </>
    )
  }
}

export const confirmationDanger = Template.bind({})
confirmationDanger.args = {
  title: 'Confirmation Danger',
  description: 'This is description of modal Confirmation Danger',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'confirmation',
  statusVariant: 'danger'
}

export const confirmationPrimary = Template.bind({})
confirmationPrimary.args = {
  title: 'Confirmation Primary',
  description: 'This is description of modal Confirmation Primary',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'confirmation',
  statusVariant: 'primary'
}

export const confirmationWarning = Template.bind({})
confirmationWarning.args = {
  title: 'Confirmation warning',
  description: 'This is description of modal Confirmation warning',
  position: 'left',
  closeable: true,
  positiveLabel: 'Submit',
  negativeLabel: 'Cancel',
  maxWidth: 'xs',
  size: 'medium',
  positionActionButton: 'right',
  typeVariant: 'confirmation',
  statusVariant: 'warning'
}
