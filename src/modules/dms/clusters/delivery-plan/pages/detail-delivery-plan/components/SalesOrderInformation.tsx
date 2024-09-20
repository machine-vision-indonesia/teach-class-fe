import React from 'react'
import { Box, Grid, Stack, useTheme } from '@mui/material'

import { MvTypography } from '@/components/atoms/mv-typography'

// TODO: Complete the props type
interface ISalesOrderInformationProps {
  delivData: any
}

export const SalesOrderInformation = ({ delivData }: ISalesOrderInformationProps) => {
  const theme = useTheme()

  return (
    <>
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Sales Order Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  PO Number Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.customer?.po_number || '12345678'}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  ID SO DMS
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.id_so_dms || '234325'}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1} md={2}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.customer?.name || 'Customer Name'}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Address
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.delivery_address ||
                    'Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum fermentum est semper molestie commodo duis id amet amet.'}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Remark
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {delivData?.remark ||
                    'Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum fermentum est semper molestie commodo duis id amet amet.'}
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  )
}
