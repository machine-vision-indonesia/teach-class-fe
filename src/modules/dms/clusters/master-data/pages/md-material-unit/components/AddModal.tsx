import React, { useState } from 'react'
import { AddModalProps } from '../types/addModal.types'
import { Modal } from '@/components/molecules/modal'
import { Stack, useTheme } from '@mui/material'
import { ModalDialog } from '@/components/molecules/modal-dialog'
import { Button } from '@/components/atoms/button'
import { Field } from '@/components/molecules/field'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { Checkbox } from '@/components/atoms/checkbox'
import { MvTypography } from '@/components/atoms/mv-typography'
import { useAtom } from 'jotai'
import { toasterDataAtom } from '@/modules/dms/common/stores/atoms'

export const AddModal: React.FC<AddModalProps> = ({ isOpen, setIsOpen, onClose }) => {
  const theme = useTheme()
  const [, setToasterData] = useAtom(toasterDataAtom)
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Create Material Unit'
        description='Please fill these informations to create!'
        renderAction={false}
        closeable
      >
        <Stack
          width={'100%'}
          rowGap={4}
          sx={{
            marginTop: '16px',
            paddingBottom: '12px'
          }}
          position={'relative'}
          alignItems={'flex-start'}
        >
          <Field label='Code'>
            <Input disabled placeholder='Code' value={'MatCod001'} width='100%' />
          </Field>
          <Field label='Unit Name' isRequired>
            <Input placeholder='Unit Name' width='100%' />
          </Field>
          <Field label='Description'>
            <Textarea onChange={() => {}} />
          </Field>
          <Checkbox size='large' label='Set as Active' />
          <MvTypography
            typeSize={'PX'}
            size={'LABEL_MD_NORMAL'}
            color={theme.colorToken.text.danger.normal}
            sx={{
              marginLeft: '28px',
              marginTop: '-16px'
            }}
          >
            If deactivated, this data record will hidden and no longer be accessible in such as dropdown value and other
            parts of the application. Use with caution.
          </MvTypography>
          <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2}>
            <Button
              variant={'outlined'}
              content='textOnly'
              size='medium'
              text='Cancel'
              onClick={onClose}
              sx={{
                paddingY: '8px',
                paddingX: '6px'
              }}
            />
            <Button
              variant={'contained'}
              content='textOnly'
              size='medium'
              text='Save'
              onClick={() => {
                setConfirmationOpen(true)
              }}
              sx={{
                paddingY: '8px',
                paddingX: '6px'
              }}
            />
          </Stack>
        </Stack>
      </Modal>
      <ModalDialog
        typeVariant='feedback'
        statusVariant='warning'
        onClose={() => setConfirmationOpen(false)}
        isOpen={confirmationOpen}
        title='Are you sure want to create material unit?'
        description='You won’t be able to revert this!'
        onOk={() => {
          setConfirmationOpen(false)
          setIsOpen(false)

          setToasterData({
            type: 'alert',
            title: 'Successfully save data.',
            content: 'Category checklist has been saved by our system.',
            variant: 'success',
            icon: 'tabler:check',
            subTitle: ''
          })
        }}
        positiveLabel='Yes'
      />
    </>
  )
}
