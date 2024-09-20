import { Input } from '@/components/atoms/input'
import { Field } from '@/components/molecules/field'
import { SelectAsync } from '@/components/molecules/select-async'
import { Box, FormHelperText, Grid, Stack, useTheme } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Button, Textarea } from '@/components/atoms'
import { Checkbox } from '@/components/atoms/checkbox'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ChecklistSchema } from './formCheckList.schema'
import { generateUUID } from '@/modules/dms/common/utils'
import { useEffect, useState } from 'react'
import { generateNextCode } from '../../utils/generateNextCode'
import ButtonAction from '@/components/molecules/button-action'
import { useQueryClient } from '@tanstack/react-query'
import { GetDDLMDCategoryChecklist } from '../../services/dropdown/dropdownCategoryChecklist.service'

const FormCheckList = ({
  prevData,
  hookForm,
  onClose,
  isValid,
  validationForm,
  onSubmit,
  onSave,
  handleDeleteItem
}: {
  prevData?: any
  hookForm: UseFormReturn<ChecklistSchema>
  onClose: () => void
  validationForm: () => void
  onSubmit?: () => void
  onSave?: () => void
  isValid: boolean
  handleDeleteItem?: (updatedItem: string[]) => void
}) => {
  const {
    register,
    control,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors }
  } = hookForm
  const theme = useTheme()

  const [itemCeklistDelete, setItemCeklistDelete] = useState<string[]>([])

  const queryClient = useQueryClient()

  const [listChecklist, setListChecklist] = useState<{ id: string; name: string; is_checked?: boolean }[]>([
    {
      id: generateUUID(),
      name: '',
      is_checked: false
    }
  ])

  const handleAddListChecklist = () => {
    setListChecklist(prev => [...prev, { id: generateUUID(), name: '', is_checked: false }])
  }

  const handleDeleteListChecklist = (id: string) => {
    if (id !== '') {
      setItemCeklistDelete((prev: string[]) => {
        const updateDeleteItem = [...prev, id.toString()]
        if (handleDeleteItem) {
          handleDeleteItem(updateDeleteItem)
        }
        return updateDeleteItem
      })
    }
  }

  const handleListChecklistInputChange = (id: string, value: string, is_checked: boolean) => {
    setListChecklist(
      listChecklist.map(item => (item.id === id ? { ...item, name: value, is_checked: is_checked } : item))
    )
  }

  useEffect(() => {
    setValue('production_checksheet_lists', listChecklist)
  }, [listChecklist, setValue])

  useEffect(() => {
    if (prevData) {
      setValue('code', prevData.code)
      setValue('name', prevData.name)
      setValue('description', prevData.description)
      setValue('category_checksheet_id', prevData.category_checksheet_id)
      setValue(
        'production_checksheet_lists',
        prevData.production_checksheet_lists.map((item: any) => item.checksheet_item_id)
      )
      setListChecklist(
        prevData.production_checksheet_lists.map((item: any) => ({ id: item.id, name: item.checksheet_item_id?.name }))
      )
    }
  }, [prevData])

  return (
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
      <Grid container columns={{ xs: 1, sm: 1, md: 2 }} spacing={2}>
        <Grid item xs={1}>
          <Field label='Code'>
            <Input {...register('code')} disabled placeholder='Autofill' width='100%' />
          </Field>
        </Grid>
        <Grid item xs={1}>
          <Controller
            control={control}
            name='category_checksheet_id'
            render={({ field }) => (
              <Field
                label='Category'
                isRequired
                error={Boolean(errors.category_checksheet_id?.id)}
                helperText={errors.category_checksheet_id?.id?.message}
              >
                <SelectAsync
                  {...field}
                  dataFetchService={GetDDLMDCategoryChecklist}
                  labelKey='name'
                  valueKey='id'
                  placeholder='Select Category'
                  onChange={value => {
                    field.onChange(value)
                  }}
                />
              </Field>
            )}
          />
        </Grid>
      </Grid>
      <Field label='Checklist Name' isRequired error={Boolean(errors.name)} helperText={errors.name?.message}>
        <Input
          {...register('name')}
          placeholder='Input Checklist Name'
          width='50%'
          value={watch('name')}
          onChange={e => setValue('name', e.target.value)}
          error={Boolean(errors.name)}
        />
      </Field>
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
            CheckList Item
          </MvTypography>
        </Box>
        <Box
          paddingY={'12px'}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          rowGap={4}
          overflow={'hidden'}
        >
          <Grid container xs={12} sx={{ paddingX: '20px', maxHeight: '220px', overflow: 'auto' }} spacing={4}>
            {listChecklist.map((item, index) => (
              <Grid item xs={6} key={item.id}>
                <Stack direction={'row'} spacing={1}>
                  <Controller
                    control={control}
                    name={`production_checksheet_lists.${index}.name`}
                    defaultValue={item.name}
                    render={({ field }) => (
                      <Field label='Item Name' isRequired>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Input
                            {...field}
                            fullWidth
                            placeholder='Input Item Name'
                            error={Boolean(errors.production_checksheet_lists?.[index]?.name)}
                            helperText={''}
                            onChange={e => {
                              field.onChange(e)
                              handleListChecklistInputChange(item.id, e.target.value, false)
                            }}
                          />
                          <Button
                            variant='contained'
                            content='iconOnly'
                            icon='tabler:circle-x'
                            color='error'
                            disabled={index === 0 && item.name === ''}
                            sx={{
                              minWidth: 0
                            }}
                            onClick={() => {
                              const updateListChecklist = [...listChecklist]
                              updateListChecklist.splice(index, 1)
                              setListChecklist(updateListChecklist)
                              handleDeleteListChecklist(item.id)
                            }}
                          />
                        </Box>
                        {errors?.production_checksheet_lists?.[index]?.name && (
                          <FormHelperText sx={{ color: theme.colorToken.text.danger.normal, ml: 0 }}>
                            {errors?.production_checksheet_lists?.[index]?.name?.message}
                          </FormHelperText>
                        )}
                        <Controller
                          name={`production_checksheet_lists.${index}.is_checked`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox {...field} checked={field.value} size='large' label='Default is Check' />
                          )}
                        />
                      </Field>
                    )}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Button
            variant='text'
            content='iconText'
            icon='tabler:plus'
            text='Add Checklist'
            sx={{
              marginX: '20px',
              minWidth: 0,
              paddingX: '12px',
              paddingY: '8px',
              alignSelf: 'flex-start'
            }}
            onClick={handleAddListChecklist}
          />
        </Box>
      </Box>
      <Field label='Description'>
        <Textarea
          {...register('description')}
          onChange={e => setValue('description', e.target.value)}
          placeholder='Description'
          value={watch('description')}
          style={{ maxWidth: '100%' }}
        />
      </Field>
      {prevData ? (
        <>
          <Controller
            name='is_active'
            control={control}
            render={({ field }) => <Checkbox {...field} checked={field.value} size='large' label='Set as Active' />}
          />
          <MvTypography
            typeSize={'PX'}
            size={'LABEL_MD_NORMAL'}
            color={theme.colorToken.text.danger.normal}
            sx={{
              marginLeft: '28px',
              marginTop: '-16px'
            }}
          >
            If deactivated, this data record will hidden and no longer be accessible in such as dropdown value and other
            parts of the application. Use with caution.
          </MvTypography>
        </>
      ) : null}
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
        <ButtonAction
          isValid={isValid}
          onClick={validationForm}
          size='medium'
          payload={{}}
          actionService={prevData ? onSave : onSubmit}
          confirmationStatusVariant='warning'
          modalOptions='default'
          confirmationText={{
            negativeLabel: 'Cancel',
            positiveLabel: 'Yes',
            title: `Are you sure want to ${prevData ? 'edit' : 'create'} delivery checklist?`,
            description: 'You won’t be able to revert this!'
          }}
          alertText={{
            error: {
              title: 'Network Errors.',
              description: 'Unable to connect to the network or server.'
            },
            success: {
              title: 'Successfully save data.',
              description: 'Checklist has been saved by our system.'
            }
          }}
          variant='contained'
          color='primary'
          text='Save'
          content='textOnly'
          onSuccessAddition={() => {
            queryClient.invalidateQueries()
          }}
        />
      </Stack>
    </Stack>
  )
}

export default FormCheckList
