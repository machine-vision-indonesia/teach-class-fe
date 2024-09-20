import React from 'react'
import { DetailModalProps } from '../types/detailModal.types'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { Modal } from '@/components/molecules/modal'
import { MvTypography } from '@/components/atoms/mv-typography'
import { ButtonCopy } from '@/components/atoms/button-copy'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'

export const DetailModal: React.FC<DetailModalProps> = ({ id, isOpen, onClose }) => {
  const theme = useTheme()
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Detail Delivery Plan'
      description='Display details of delivery plan'
      renderAction={false}
      size='large'
    >
      <Stack
        width='100%'
        alignItems={'start'}
        sx={{
          marginTop: '20px'
        }}
        spacing={'16px'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          width={'100%'}
          borderRadius={'6px'}
          border={`1px solid ${theme.colorToken.border.neutral.normal}`}
          padding={'16px'}
          gap={'20px'}
        >
          <Stack direction={'row'} width={'100%'} alignItems={'center'} spacing={'8px'}>
            <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
              Status :
            </MvTypography>
            <Badge color='primary' isTransparent label={'Open'} style='circular' />
          </Stack>
          <Grid container columns={3} spacing={3}>
            <Grid item xs={1}>
              <Stack alignItems={'flex-start'} spacing={'0px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  DP Number
                </MvTypography>
                <Stack direction={'row'} spacing={'1.25px'} alignItems={'center'}>
                  <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                    234325
                  </MvTypography>
                  <ButtonCopy value={''} title={'DP Number'} disabled />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'flex-start'} spacing={'8px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Type
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                  Delivery
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'flex-start'} spacing={'8px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Date Request
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                  DD/MM/YYYY
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'flex-start'} spacing={'8px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                  Customer Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack alignItems={'flex-start'} spacing={'8px'}>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Address
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'LABEL_LG_NORMAL'}>
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                  fermentum est semper molestie commodo duis id amet amet.
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
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
            text='Detail'
            onClick={onClose}
            sx={{
              paddingY: '8px',
              paddingX: '6px'
            }}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}
