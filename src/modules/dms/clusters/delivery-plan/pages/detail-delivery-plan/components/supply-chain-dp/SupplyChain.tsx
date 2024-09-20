import React, { useState } from 'react'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Badge } from '@/components/atoms/badge'
import { Button, Select } from '@/components/atoms'
import { Accordion } from '@/components/molecules/accordion'
import { IMaterialList } from '../../types/supply-chain-dp/materialList.types'
import { formatDateString, generateUUID } from '@/modules/dms/common/utils'
import { MaterialListItem } from './MaterialListItem'
import { DateConfirmation } from '@/components/molecules/date-confirmation'
import ButtonAction from '@/components/molecules/button-action'
import { useNavigate } from 'react-router-dom'
import { DeliveryPlanStatus } from '@/modules/dms/common/constants'

export const SupplyChain = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [selectedPreparationLocation, setSelectedPreparationLocation] = useState<{ id: string; label: string }>()

  const [sampleMaterialList, setSampleMaterialList] = useState<IMaterialList[]>([
    {
      id: generateUUID(),
      name: 'Material A',
      code: 'Material Code',
      status: 'Finish Goods',
      statusColor: 'success',
      stock: 50,
      request: 50,
      pending: 0,
      confirmed: 0,
      remaining: 50
    },
    {
      id: generateUUID(),
      name: 'Material B',
      code: 'Material Code',
      status: 'Finish Goods',
      statusColor: 'success',
      stock: 100,
      request: 200,
      pending: 0,
      confirmed: 0,
      remaining: 100
    },
    {
      id: generateUUID(),
      name: 'Material C',
      code: 'Material Code',
      status: 'Raw Material',
      statusColor: 'info',
      stock: 100,
      request: 200,
      pending: 0,
      confirmed: 0,
      remaining: 100
    }
  ])

  const onSuccessAddition = () => {
    // TODO: hit api & next step (simulated)
    localStorage.setItem('_simulated_status', DeliveryPlanStatus.SCM_APPROVED)
    navigate(0)
  }

  return (
    <Stack width={'100%'} alignItems={'start'} rowGap={'12px'}>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={{
          xs: 'column',
          md: 'row'
        }}
        justifyContent={'space-between'}
        alignItems={{
          xs: 'flex-start',
          md: 'center'
        }}
        gap={'12px'}
      >
        <Stack rowGap={'8px'}>
          <MvTypography typeSize={'PX'} size={'TITLE_SM'}>
            Detail Delivery Plan
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
            Display all delivery plan details
          </MvTypography>
        </Stack>
        <Badge color={'primary'} isTransparent style={'circular'} label={'DP Open'} size='medium' />
      </Box>
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
                  12345678
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  ID SO DMS
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1} md={2}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Customer
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Customer Name
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Address
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                  fermentum est semper molestie commodo duis id amet amet.
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Remark
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat mauris pretium mauris feugiat. Vestibulum
                  fermentum est semper molestie commodo duis id amet amet.
                </MvTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
        <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
          <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
            Delivery Plan Information
          </MvTypography>
        </Box>
        <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
          <Grid container columns={{ xs: 1, md: 2 }} rowSpacing={6} columnSpacing={4}>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  DP Number
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  234325
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Type
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  Delivery
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'} color={theme.palette.neutral.subtlestText}>
                  Delivery Date Request
                </MvTypography>
                <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
                  {formatDateString(new Date())}
                </MvTypography>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems={'start'} rowGap={'8px'}>
                <Stack direction={'row'}>
                  <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                    Preparation Location
                  </MvTypography>
                  <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'} color={theme.colorToken.text.danger.normal}>
                    *
                  </MvTypography>
                </Stack>
                <Select
                  data={[
                    {
                      id: 'Jababeka',
                      label: 'Jababeka'
                    },
                    {
                      id: 'KBI',
                      label: 'KBI'
                    }
                  ]}
                  variant='default'
                  labelKey={'label'}
                  valueKey={'id'}
                  placeholder='Select Location'
                  fullWidth
                  onChange={value => setSelectedPreparationLocation(value)}
                  selected={selectedPreparationLocation}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Grid container columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
        <Grid item xs={1} md={2} xl={3}>
          <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
            <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Material List
              </MvTypography>
            </Box>
            <Stack width={'100%'} alignItems={'start'} padding={'20px 16px'}>
              <Accordion
                data={sampleMaterialList.map((item, index) => {
                  return {
                    content: (
                      <MaterialListItem
                        key={index}
                        selectedPreparationLocation={selectedPreparationLocation || null}
                        material={item}
                      />
                    ),
                    leftElement: (
                      <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
                        <MvTypography
                          typeSize={'PX'}
                          size={'LABEL_SM_NORMAL'}
                          color={theme.palette.neutral.subtlestText}
                        >
                          | {item.code}
                        </MvTypography>
                        <Badge color={item.statusColor} isTransparent style='rect' label={item.status} size='medium' />
                      </Stack>
                    ),
                    rightElement: (
                      <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
                        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                          Request : {item.request} L |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                          Pending : {item.pending} L |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                          Confirmed : {item.confirmed} L |
                        </MvTypography>
                        <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
                          Remaining : {item.remaining} L
                        </MvTypography>
                      </Stack>
                    ),
                    title: item.name
                  }
                })}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box width={'100%'} border={`1px solid ${theme.colorToken.border.neutral.normal}`} borderRadius={'6px'}>
            <Box width={'100%'} padding={'12px'} borderBottom={`1px solid ${theme.colorToken.border.neutral.normal}`}>
              <MvTypography typeSize={'PX'} size={'BODY_LG_BOLDEST'}>
                Date Confirmation
              </MvTypography>
            </Box>
            <Stack width={'100%'} alignItems={'start'} padding={'16px'}>
              <DateConfirmation
                sectionTitles={['Supply Chain', 'Production', 'Delivery']}
                initialValues={{
                  supplyChain: { date: null, selectedOption: '' },
                  production: { date: null, selectedOption: '' },
                  delivery: { date: null, selectedOption: '' }
                }}
                disabledSections={{
                  supplyChain: true,
                  production: true,
                  delivery: true
                }}
                onChange={() => {}}
                direction='column'
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={'8px'}
        marginTop={'32px'}
        width={'100%'}
      >
        <Button
          variant='outlined'
          content='textOnly'
          text='Cancel'
          sx={{
            minWidth: 0,
            paddingX: '16px',
            paddingY: '12px'
          }}
        />
        <ButtonAction
          size='medium'
          payload={{}}
          actionService={onSuccessAddition}
          confirmationStatusVariant='warning'
          modalOptions='default'
          confirmationText={{
            negativeLabel: 'Cancel',
            positiveLabel: 'Yes',
            title: 'Are you sure want to confirm date?',
            description: 'You won’t be able to revert this!'
          }}
          alertText={{
            error: {
              title: 'Network Errors.',
              description: 'Unable to connect to the network or server.'
            },
            success: {
              title: 'Successfully save data.',
              description: 'Date has been saved by our system.'
            }
          }}
          variant='contained'
          color='primary'
          text={'Save'}
          content='textOnly'
          sx={{
            minWidth: 0,
            paddingX: '16px',
            paddingY: '12px'
          }}
        />
      </Stack>
    </Stack>
  )
}
