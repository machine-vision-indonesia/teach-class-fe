import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Accordion } from '@/components/molecules/accordion'
import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import DeliveryPlanItem from './DeliveryPlanItem'
import { IDeliveryPlanItem } from '../types/deliveryPlanItem.types'

export const DeliveryPlan = () => {
  const theme = useTheme()

  const [allDeliveryPlans, setAllDeliveryPlans] = React.useState<IDeliveryPlanItem[]>([])

  const handleAddDeliveryPlan = () => {
    setAllDeliveryPlans(prev => [
      ...prev,
      {
        id: prev.length + 1,
        dp_number: '',
        delivery_type: undefined,
        delivery_date_request: null
      }
    ])
  }

  const handleDeleteDeliveryPlan = (id: number | string) => {
    setAllDeliveryPlans(prev => prev.filter(deliveryPlan => deliveryPlan.id !== id))
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      borderRadius={'6px'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
      padding={'24px'}
      gap={'16px'}
      alignItems={'flex-start'}
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
        <Stack alignItems={'flex-start'} spacing={'4px'}>
          <MvTypography typeSize={'PX'} size={'TITLE_SM'}>
            Delivery Plan Information
          </MvTypography>
          <MvTypography typeSize={'PX'} size={'BODY_MD_NORMAL'} color={theme.palette.neutral[400]}>
            Please complete the form below to continue the process
          </MvTypography>
        </Stack>
        <Stack direction={'row'} alignItems='center' spacing={'4px'}>
          <MvTypography typeSize={'PX'} size={'LABEL_MD_NORMAL'}>
            Total Plan:
          </MvTypography>
          <Box
            bgcolor={theme.colorToken.background.primary.subtlest}
            borderRadius={'100px'}
            padding={'6px'}
            minWidth={'28px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <MvTypography typeSize={'PX'} size={'BODY_SM_BOLDEST'}>
              {allDeliveryPlans.length}
            </MvTypography>
          </Box>
        </Stack>
      </Stack>
      {allDeliveryPlans.length > 0 ? (
        <>
          <Accordion
            data={allDeliveryPlans.map((item, index) => {
              return {
                content: (
                  <DeliveryPlanItem
                    id={item.id}
                    dp_number={item.dp_number}
                    delivery_type={item.delivery_type}
                    delivery_date_request={item.delivery_date_request}
                  />
                ),
                title: `Delivery Plan ${index + 1}`,
                rightElement: (
                  <Button
                    variant='text'
                    color='error'
                    content='iconOnly'
                    icon='tabler:circle-x'
                    sx={{
                      minWidth: 0,
                      paddingX: '7.8px',
                      paddingY: '4.8px'
                    }}
                    onClick={() => handleDeleteDeliveryPlan(item.id)}
                  />
                )
              }
            })}
          />
          <Button
            variant='text'
            content='iconText'
            text='Add Delivery Plan'
            icon='tabler:plus'
            onClick={handleAddDeliveryPlan}
          />
        </>
      ) : (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} minHeight={'172px'} spacing={'24px'}>
          <MvTypography typeSize={'PX'} size={'LABEL_MD_BOLDEST'}>
            Please make a delivery plan first, to continue the process!
          </MvTypography>
          <Button
            variant='contained'
            content='iconText'
            text='Add Delivery Plan'
            icon='tabler:plus'
            onClick={handleAddDeliveryPlan}
          />
        </Stack>
      )}
    </Box>
  )
}
