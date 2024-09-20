import React from 'react'
import { Box, Dialog, DialogActions, DialogContent, Stack } from '@mui/material'

import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { ButtonCopy } from '@/components/atoms/button-copy'

import { ICalendarDetailModalProps } from '../types/calendar.types'

const CalendarDetail = ({ isOpen, onClose }: ICalendarDetailModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
      <DialogContent>
        <Button
          content='iconOnly'
          icon='tabler:x'
          variant='text'
          sx={{ minWidth: 0, p: '8px', position: 'absolute', right: 8, top: 8 }}
        />
        <Stack sx={{ gap: '4px' }}>
          <MvTypography typeSize='PX' size='TITLE_SM'>
            Detail Sales Order
          </MvTypography>
          <MvTypography typeSize='PX' size='BODY_SM_NORMAL'>
            Display details of sales orders
          </MvTypography>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'column',
            gap: '24px',
            mt: '20px'
          }}
        >
          <Stack sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
            <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
              Status :
            </MvTypography>
            <Badge color='primary' label='Open' style='circular' size='medium' />
          </Stack>

          <Stack
            sx={{
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}
          >
            <Stack sx={{ width: '100%', gap: '8px' }}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                PO Number Customer
              </MvTypography>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                -
              </MvTypography>
            </Stack>

            <Stack sx={{ width: '100%', gap: '8px' }}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                ID SO DMS
              </MvTypography>
              <Stack sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center', mt: '-8px' }}>
                <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                  234325
                </MvTypography>
                <ButtonCopy value='234325' title='ID SO DMS' />
              </Stack>
            </Stack>

            <Stack sx={{ width: '100%', gap: '8px' }}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Customer
              </MvTypography>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Customer Name
              </MvTypography>
            </Stack>
          </Stack>

          <Stack sx={{ flexDirection: 'row', gap: '20px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack sx={{ width: '100%', gap: '8px' }}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Delivery Address
              </MvTypography>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>

            <Stack sx={{ width: '100%', gap: '8px' }}>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Remark
              </MvTypography>
              <MvTypography typeSize='PX' size='BODY_LG_NORMAL'>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                fermentum est semper molestie commodo duis id amet amet.
              </MvTypography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ padding: '8px 12px' }} variant='outlined' color='primary' content='textOnly' text='Cancel' />
        <Button sx={{ padding: '8px 12px' }} variant='contained' color='primary' content='textOnly' text='Detail' />
      </DialogActions>
    </Dialog>
  )
}

export default CalendarDetail
