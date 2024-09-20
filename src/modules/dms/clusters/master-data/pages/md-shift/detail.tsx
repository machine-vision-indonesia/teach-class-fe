import { Button } from '@/components/atoms'
import { Badge } from '@/components/atoms/badge'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import ButtonAction from '@/components/molecules/button-action'
import { useGetMDDriverById } from '@/modules/dms/clusters/master-data/pages/md-shift/services/fetch/fetchStatusById.service'
import { Box, Stack, useTheme } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddAndEditModal } from './components/AddAndEditModal'
import { format } from 'date-fns'
import { ActionDeleteShift } from './services/action/actionDeleteShift.service'

const DetailShift = () => {
  const { id } = useParams()
  const theme = useTheme()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const getMDDriverByIdQuery = useGetMDDriverById({ id: id || '' })

  const [addAndEditModalIsOpen, setAddAndEditModalIsOpen] = useState<'ADD' | 'EDIT' | false>(false)

  return (
    <>
      <Stack width={'100%'} rowGap={'28px'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack spacing={3}>
            <MvTypography typeSize={'PX'} size={'TITLE_XL'}>
              Detail Shift
            </MvTypography>
            <Breadcrumbs
              data={[
                {
                  label: 'Home',
                  path: '/'
                },
                {
                  label: 'Shift',
                  path: '/solutions/dms/master-data/shift'
                },
                {
                  label: 'Detail Shift',
                  path: ''
                }
              ]}
            />
          </Stack>
          <Stack direction={'row'} gap={'12px'} alignItems={'center'}>
            <ButtonAction
              sx={{
                minWidth: 0,
                paddingX: '12px',
                paddingY: '8px',
                boxShadow: '0px 2px 4px 0px #5A5D6233'
              }}
              size='medium'
              icon='tabler:trash'
              payload={null}
              actionService={() => {
                ActionDeleteShift(id || '')
              }}
              confirmationStatusVariant='danger'
              modalOptions='default'
              confirmationText={{
                negativeLabel: 'Cancel',
                positiveLabel: 'Yes',
                title: 'Are you sure you want to delete?',
                description: 'You won’t be able to revert this!'
              }}
              alertText={{
                error: {
                  title: 'Network Errors.',
                  description: 'Unable to connect to the network or server.'
                },
                success: {
                  title: 'Successfully delete data.',
                  description: 'Data has been deleted by our system.'
                }
              }}
              variant='plain'
              text='Delete'
              color='error'
              content='iconText'
              onSuccessAddition={() => {
                queryClient.invalidateQueries()
                navigate('/solutions/dms/master-data/shift')
              }}
            />
            <Button
              variant='outlined'
              content='iconText'
              icon='tabler:pencil'
              text='Edit'
              color='primary'
              sx={{
                minWidth: 0,
                paddingX: '12px',
                paddingY: '8px',
                boxShadow: '0px 2px 4px 0px #5A5D6233'
              }}
              onClick={() => setAddAndEditModalIsOpen('EDIT')}
            />
          </Stack>
        </Stack>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          width={'100%'}
          bgcolor={theme.colorToken.background.neutral.normal}
          borderRadius={'6px'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
        >
          <Box
            display={'flex'}
            padding={'12px'}
            borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}
            width={'100%'}
          >
            <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'}>
              General Information
            </MvTypography>
          </Box>
          <Stack padding={'16px'} rowGap={'16px'} width={'100%'} alignItems={'flex-start'}>
            <Stack alignItems={'flex-start'} spacing={'4px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                Name
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                {getMDDriverByIdQuery.data?.data?.name}
              </MvTypography>
            </Stack>
            <Stack alignItems={'flex-start'} spacing={'4px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                Shift Type
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                {getMDDriverByIdQuery.data?.data?.is_overtime ? 'Overtime' : 'Regular'}
              </MvTypography>
            </Stack>
            <Stack alignItems={'flex-start'} spacing={'4px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                Start - End Time
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                {getMDDriverByIdQuery.data?.data?.start ? format(getMDDriverByIdQuery.data?.data?.start, 'HH:mm') : ''}{' '}
                - {getMDDriverByIdQuery.data?.data?.end ? format(getMDDriverByIdQuery.data?.data?.end, 'HH:mm') : ''}
              </MvTypography>
            </Stack>
            <Stack alignItems={'flex-start'} spacing={'4px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                Company
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                {getMDDriverByIdQuery.data?.data?.company_id?.name || '-'}
              </MvTypography>
            </Stack>
            <Stack alignItems={'flex-start'} spacing={'4px'}>
              <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'} color={theme.palette.neutral.subtlestText}>
                Plan Name
              </MvTypography>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                {getMDDriverByIdQuery.data?.data?.plant_id?.name || '-'}
              </MvTypography>
            </Stack>
          </Stack>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          width={'100%'}
          bgcolor={theme.colorToken.background.neutral.normal}
          borderRadius={'6px'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          padding={'16px'}
        >
          <Stack alignItems={'flex-start'} spacing={'8px'}>
            <Badge
              color={getMDDriverByIdQuery.data?.data?.is_active ? 'success' : 'danger'}
              isTransparent
              label={getMDDriverByIdQuery.data?.data?.is_active ? 'Active' : 'Inactive'}
              size='medium'
              style={'rect'}
            />
            <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'} color={theme.palette.neutral.subtlestText}>
              {`This data record is ${getMDDriverByIdQuery.data?.data?.is_active ? 'active' : 'inactive'} and ${getMDDriverByIdQuery.data?.data?.is_active ? '' : 'no longer'} accessible across application. 
              ${getMDDriverByIdQuery.data?.data?.is_active ? 'It could be shown as a dropdown value, or else.' : ''}`}
            </MvTypography>
          </Stack>
        </Box>
      </Stack>
      {addAndEditModalIsOpen && (
        <AddAndEditModal
          modalType={addAndEditModalIsOpen}
          isOpen={!!addAndEditModalIsOpen}
          setIsOpen={setAddAndEditModalIsOpen}
          onClose={() => {
            setAddAndEditModalIsOpen(false)
          }}
          id={id || ''}
          setId={() => {}}
        />
      )}
    </>
  )
}

export default DetailShift
