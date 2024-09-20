import React, { useEffect, useState } from 'react'
import { DeleteModalProps } from '../types/deleteModal.types'
import { Modal } from '@/components/molecules/modal'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Button } from '@/components/atoms/button'
import { MvTypography } from '@/components/atoms/mv-typography'
import { CheckSheetItems, useGetMDCategoryChecklistById } from '../services/fetch/fetchCategoryChecklistById.service'
import ButtonAction from '@/components/molecules/button-action'
import client from '@/client'
import { useQueryClient } from '@tanstack/react-query'
import { ActionDeleteCategoryChecklist } from '../services/action/actionDeleteCategoryChecklist.service'

export const DeleteModal: React.FC<DeleteModalProps> = ({ id, setId, isOpen, setIsOpen, onClose }) => {
  const theme = useTheme()

  const queryClient = useQueryClient()

  const categoryChecklist = useGetMDCategoryChecklistById({
    id: id || ''
  })

  const [productionChecksheets, setProductionChecksheets] = useState<CheckSheetItems[]>([])

  useEffect(() => {
    if (categoryChecklist?.data?.data) {
      const data = categoryChecklist?.data?.data
      setProductionChecksheets(data?.production_checksheets || [])
    }
  }, [categoryChecklist.data])

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
          <Box
            borderRadius={'6px'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
            padding={'16px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            width={'100%'}
            gap={'16px'}
          >
            <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
              You will also delete the checklist data in "Category Name" along with the existing checklist list :
            </MvTypography>
            <Grid container columns={{ xs: 1, md: 2 }} sx={{ paddingX: '24px', width: '100%' }} spacing={4}>
              {productionChecksheets?.map((item, index) => (
                <Grid item xs={1} key={index}>
                  <Stack direction={'row'} alignItems={'center'} gap={2} width={'100%'}>
                    <Box
                      borderRadius={'100px'}
                      width={'6px'}
                      height={'6px'}
                      bgcolor={theme.colorToken.background.primary.normal}
                    />
                    <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                      {item?.name}
                    </MvTypography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'} gap={2} sx={{ marginTop: '24px' }}>
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
            <ButtonAction
              isValid={true}
              onClick={() => {}}
              size='medium'
              payload={{}}
              actionService={() => {
                ActionDeleteCategoryChecklist({
                  id: id || ''
                })
              }}
              confirmationStatusVariant='danger'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure want to delete category checklist?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully save data.',
                  description: 'Category checklist has been deleted by our system.'
                }
              }}
              variant='contained'
              color='error'
              text='Yes'
              content='textOnly'
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                setIsOpen(false)
              }}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}
