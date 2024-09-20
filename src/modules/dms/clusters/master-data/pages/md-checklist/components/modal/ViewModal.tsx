import React from 'react'
import { ViewModalProps } from '../../types/viewModal.types'
import { Modal } from '@/components/molecules/modal'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Button } from '@/components/atoms/button'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { Icon } from '@iconify/react/dist/iconify.js'

export const ViewModal: React.FC<ViewModalProps> = ({
  id,
  data,
  setId,
  isOpen,
  setIsOpen,
  onClose,
  setEditModalIsOpen
}) => {
  const theme = useTheme()

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Detail Checklist'
        description='These information is details of material type'
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
          <Grid container columns={{ xs: 1, sm: 2, md: 2 }} rowSpacing={4}>
            <Grid item xs={1}>
              <Stack spacing={2}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Code
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                  {data.code}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack spacing={2}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Category
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                  {data.category_checksheet_id.name}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack spacing={2}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Checklist Name
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
                  {data.name}
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            borderRadius={'6px'}
            width={'100%'}
            border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          >
            <Box padding={'12px'} width={'100%'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
              <MvTypography typeSize={'PX'} size={'LABEL_LG_BOLDEST'} color={theme.colorToken.text.neutral.normal}>
                CheckList
              </MvTypography>
            </Box>
            <Box paddingY={'12px'} width={'100%'}>
              <Grid container columns={{ xs: 1, md: 3 }} sx={{ paddingX: '24px', width: '100%' }} spacing={4}>
                {data.production_checksheet_lists.map((item, index) => (
                  <Grid item xs={1}>
                    <Stack direction={'row'} alignItems={'center'} gap={2} width={'100%'}>
                      <Box
                        borderRadius={'100px'}
                        width={'6px'}
                        height={'6px'}
                        bgcolor={theme.colorToken.background.primary.normal}
                      />
                      <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                        {item.checksheet_item_id.name}
                      </MvTypography>
                      {item.checksheet_item_id?.is_checked && (
                        <Icon icon='mage:check-circle' color={theme.colorToken.icon.success.normal} fontSize={24} />
                      )}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Stack width={'100%'} spacing={2}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
              Description
            </MvTypography>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.colorToken.text.neutral.normal}>
              {data.description ?? '-'}
            </MvTypography>
          </Stack>
          <Stack width={'71%'} spacing={2} alignItems={'start'}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
              Data Status
            </MvTypography>
            <Badge
              color={data.is_active ? 'success' : 'danger'}
              isTransparent
              style={'rect'}
              label={data.is_active ? 'Active' : 'Inactive'}
              size='medium'
            />
            <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'} color={theme.palette.neutral.subtlestText}>
              {data.is_active
                ? 'This data record is active and accessible across application. It could be shown as a dropdown value, or else'
                : 'This data record is inactive and not accessible across apps.'}
            </MvTypography>
          </Stack>
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
              size='medium'
              text='Edit'
              sx={{
                minWidth: 0,
                paddingY: '8px',
                paddingX: '12px'
              }}
              onClick={() => {
                setEditModalIsOpen(true)
                onClose && onClose()
              }}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}
