import React from 'react'
import { DeleteModalProps } from '../types/deleteModal.types'
import { Modal } from '@/components/molecules/modal'
import { Stack } from '@mui/material'
import { Button } from '@/components/atoms/button'
import { useAtom } from 'jotai'
import { toasterDataAtom } from '@/modules/dms/common/stores/atoms'

export const DeleteModal: React.FC<DeleteModalProps> = ({ id, setId, isOpen, setIsOpen, onClose }) => {
  const [, setToasterData] = useAtom(toasterDataAtom)
  return (
    <>
      <Modal
        type='confirmation'
        status='danger'
        color='error'
        isOpen={isOpen}
        onClose={onClose}
        title='Are you sure you want to delete?'
        description='You won’t be able to revert this!'
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
          <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2} sx={{ marginTop: '24px' }}>
            <Button
              variant={'outlined'}
              content='textOnly'
              size='medium'
              text='Cancel'
              onClick={onClose}
              sx={{
                minWidth: 0,
                paddingY: '8px',
                paddingX: '12px'
              }}
            />
            <Button
              variant={'contained'}
              content='textOnly'
              color='error'
              size='medium'
              text='Yes'
              onClick={() => {
                setIsOpen(false)

                setToasterData({
                  type: 'alert',
                  title: 'Network Errors.',
                  content: 'Unable to connect to the network or server.',
                  variant: 'danger',
                  icon: 'tabler:alert-triangle',
                  subTitle: ''
                })
              }}
              sx={{
                minWidth: 0,
                paddingY: '8px',
                paddingX: '12px'
              }}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}
