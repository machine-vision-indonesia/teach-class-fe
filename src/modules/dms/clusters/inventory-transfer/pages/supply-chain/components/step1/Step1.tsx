import { Button, Select } from '@/components/atoms'
import { Box, Skeleton, Stack, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { useStepAction } from '../../hooks/step.hook'
import { activeStepAtom } from '../../stores/step.store'
import { StepState } from '../../constant/step.constant'
import { fetchSalesOrdersPerWeek } from '../../../../services'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Field } from '@/components/molecules/field'
import { SectionSoDp } from './SectionSoDp'
import { Badge } from '@/components/atoms/badge'
import { Accordion } from '@/components/molecules/accordion'
import { DateRangePicker } from '@/components/molecules/date-range-picker'

const renderLoading = () => {
  return (
    <Stack width={'100%'} rowGap={'12px'}>
      {/* Repeat the structure for each day's accordion */}
      {[...Array(6)].map((_, index) => (
        <Skeleton variant='rounded' width={'100%'} height={60} />
      ))}
    </Stack>
  )
}

const schema = yup.object().shape({
  from: yup.string().required(),
  to: yup.string().required()
})

export const Step1 = () => {
  const theme = useTheme()
  const { handleBackFrom, handleCancel, handleNextFrom } = useStepAction()

  const [activeStep] = useAtom(activeStepAtom)

  const { data, isFetching, isLoading, isError } = fetchSalesOrdersPerWeek({})
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmitFilter = (data: any) => {}

  if (isFetching || isLoading) {
    return renderLoading()
  }

  if (isError) {
    return <>Error</>
  }

  return (
    <Box
      borderRadius={'6px'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      rowGap={'16px'}
      padding={'16px'}
      marginTop={'12px'}
      width={'100%'}
      border={`1px solid ${theme.colorToken.border.neutral.normal}`}
    >
      <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction='row' spacing={2}>
        <Stack alignItems={'center'} direction='row' spacing={2}>
          <MvTypography color={theme.colorToken.text.neutral.normal} typeSize='PX' size='TITLE_SM'>
            Sales Order list per Week
          </MvTypography>
          <DateRangePicker />
        </Stack>
        <MvTypography color={theme.colorToken.link.warning.normal} typeSize='PX' size='LABEL_LG_BOLDEST'>
          Please choose a warehouse !
        </MvTypography>
      </Stack>
      <Box component='form' onSubmit={handleSubmit(onSubmitFilter)} sx={{ width: '100%' }}>
        <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction='row' spacing={4}>
          <Box width={'50%'}>
            <Controller
              name='from'
              control={control}
              render={({ field: { name, ...rest }, fieldState }) => {
                return (
                  <Field
                    size='small'
                    label='From'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    fullWidth
                    {...rest}
                  >
                    <Select
                      data={[
                        {
                          id: '04a8194f-fd65-4d5a-a536-548b56a379bd',
                          text: 'KBI'
                        },
                        {
                          id: '04a8194f-fd65-4d5a-a536-548b56a379ba',
                          text: 'JABABEKA'
                        }
                      ]}
                      labelKey='text'
                      valueKey='id'
                      size='small'
                    />
                  </Field>
                )
              }}
            />
          </Box>
          <Box width={'50%'}>
            <Controller
              name='to'
              control={control}
              render={({ field: { name, ...rest }, fieldState }) => {
                return (
                  <Field
                    size='small'
                    label='To'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    fullWidth
                    {...rest}
                  >
                    <Select
                      data={[
                        {
                          id: '04a8194f-fd65-4d5a-a536-548b56a379bd',
                          text: 'KBI'
                        },
                        {
                          id: '04a8194f-fd65-4d5a-a536-548b56a379ba',
                          text: 'JABABEKA'
                        }
                      ]}
                      labelKey='text'
                      valueKey='id'
                      size='small'
                    />
                  </Field>
                )
              }}
            />
          </Box>
        </Stack>
      </Box>
      {(isFetching || isLoading) && renderLoading()}
      {isError && <>Error</>}

      <Box width={'100%'}>
        <Accordion
          data={[
            {
              rightElement: (
                <Stack direction='row' alignItems='center' spacing={2}>
                  <MvTypography size='LABEL_MD_BOLDEST' color={theme.colorToken.text.neutral.normal} typeSize='PX'>
                    Total Sales Order :
                  </MvTypography>
                  <Badge color='primary' style='circular' isTransparent size='medium' icon='' label='1' />
                </Stack>
              ),
              content: <SectionSoDp />,
              title: 'August 8, 2023 | Monday'
            },
            {
              rightElement: (
                <Stack direction='row' alignItems='center' spacing={2}>
                  <MvTypography size='LABEL_MD_BOLDEST' color={theme.colorToken.text.neutral.normal} typeSize='PX'>
                    Total Sales Order :
                  </MvTypography>
                  <Badge color='primary' style='circular' isTransparent size='medium' icon='' label='1' />
                </Stack>
              ),
              content: <SectionSoDp />,
              title: 'August 9, 2023 | Tuesday '
            }
          ]}
        />
      </Box>
      <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction='row' spacing={2}>
        {activeStep === 0 ? (
          <Button
            variant='outlined'
            color='primary'
            content='textOnly'
            text='Cancel'
            onClick={handleCancel}
            sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
          />
        ) : (
          <Button
            variant='outlined'
            color='primary'
            content='textOnly'
            onClick={() => handleBackFrom(StepState.SELECT_MATERIAL)}
            text='Back'
            sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
          />
        )}

        <Button
          variant='contained'
          color='primary'
          content='textOnly'
          text='Next'
          onClick={() => handleNextFrom(StepState.TRANSFER_PLAN)}
          sx={{ paddingX: '16px', paddingY: '12px', minWidth: 0 }}
        />
      </Stack>
    </Box>
  )
}
