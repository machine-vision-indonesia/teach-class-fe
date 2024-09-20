import type { Meta, StoryObj } from '@storybook/react'
import TableAppend from '../components/TableAppend'
import { PropsTableAppend, CustomGridColDef } from '../types/tableAppend.type'
import { GetTableUsers } from '../services/example.service'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Input } from '@/components/atoms/input'
import { Autocomplete, Box, Typography } from '@mui/material'
import { Button } from '@/components/atoms'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useMemo, useCallback, useState, useEffect } from 'react'
import { exampleData, exampleInitialValueMaterialList } from '../constant/exampleData'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonAction from '../../button-action'

const schema = yup.object().shape({
  material_list: yup.array().of(
    yup.object().shape({
      material_name: yup.string().required().default(''),
      material_code: yup.string().required().default(''),
      bach_number: yup.string().required().default(''),
      type: yup.string().optional().default(''),
      stock: yup.string().optional().default(''),
      quantity: yup.string().required().default(''),
      unit: yup.string().optional().default('')
    })
  )
})

const meta: Meta<typeof TableAppend> = {
  title: 'Components/Organism/TableAppend',
  component: TableAppend,
  argTypes: {
    textButton: { control: 'text' },
    colorNull: { control: 'color' },
    textNull: { control: 'text' },
    columns: { control: 'object' },
    rows: { control: 'object' }
  }
}

export default meta

type Story = StoryObj<PropsTableAppend>

export const DefaultWithoutSubmit: Story = {
  args: {
    textButton: 'Add Row',
    colorNull: 'blue',
    textNull: 'Please Add Row First'
  },
  render: args => {
    const { data, isLoading } = GetTableUsers({})

    const {
      control,
      trigger,
      formState: { errors, isValid },
      setValue,
      handleSubmit
    } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema)
    })

    const columns: CustomGridColDef[] = useMemo(
      () => [
        {
          field: 'delete',
          headerName: '',
          width: 200,
          editable: false,
          sortable: false,
          disableColumnMenu: true,
          required: false
        }
      ],
      [control, data, isLoading]
    )

    return (
      <TableAppend
        columns={columns}
        control={control}
        controllerName='material_list'
        values={exampleData.material_list}
        initialNewValue={exampleInitialValueMaterialList}
      />
    )
  }
}

export const Example: Story = {
  render: () => {
    const [valueSubmit, setValueSubmit] = useState<{ rows: any[] } | undefined>()
    const { data, isLoading } = GetTableUsers({})

    const {
      control,
      trigger,
      formState: { errors, isValid },
      setValue,
      handleSubmit
    } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema)
    })

    // Memoize columns to prevent unnecessary re-renders
    const columns: CustomGridColDef[] = useMemo(
      () => [
        {
          field: 'material_name',
          headerName: 'MATERIAL NAME',
          width: 200,
          editable: false,
          sortable: false,
          required: true,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.material_name`}
                control={control}
                rules={{ required: 'Material is required' }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'material_code',
          headerName: 'MATERIAL CODE',
          width: 200,
          editable: false,
          sortable: false,
          required: true,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.material_code`}
                control={control}
                rules={{ required: 'Material is required' }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'bach_number',
          headerName: 'BATCH NUMBER',
          width: 150,
          editable: false,
          sortable: false,
          required: true,
          justifyContent: 'center',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.bach_number`}
                control={control}
                rules={{ required: 'Material is required' }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'type',
          headerName: 'TYPE',
          width: 200,
          editable: false,
          sortable: false,
          required: false,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.type`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'stock',
          headerName: 'STOCK',
          width: 200,
          editable: false,
          sortable: false,
          required: false,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.stock`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'quantity',
          headerName: 'QUANTITY',
          width: 200,
          editable: false,
          sortable: false,
          required: true,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.quantity`}
                control={control}
                rules={{ required: 'Material is required' }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          field: 'unit',
          headerName: 'UNIT',
          width: 200,
          editable: false,
          sortable: false,
          required: false,
          justifyContent: 'flex-start',
          disableColumnMenu: true,
          renderCell: (params: GridRenderCellParams) => {
            const rowIndex = params.api.getAllRowIds().indexOf(params.id)

            return (
              <Controller
                name={`material_list.${rowIndex}.unit`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    size='small'
                    type='text'
                    width='100%'
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Enter material'
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                )}
              />
            )
          }
        },
        {
          disableColumnMenu: true,
          field: 'delete',
          headerName: '',
          width: 200,
          editable: false,
          sortable: false,
          required: false
        }
      ],
      [control, data, isLoading]
    )

    // Memoize the submit handler
    const onSubmit = useCallback((data: { rows: any[] }) => {
      console.log('submit:', data)
      setValueSubmit(data)
    }, [])

    useEffect(() => {
      setValue('material_list', exampleData.material_list)
    }, [])

    return (
      <>
        <TableAppend
          columns={columns}
          control={control}
          controllerName='material_list'
          values={exampleData.material_list}
          initialNewValue={exampleInitialValueMaterialList}
        />
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
          <ButtonAction
            onClick={() => {
              trigger()
            }}
            isValid={isValid}
            size='large'
            payload={{}}
            actionService={() => {}}
            confirmationStatusVariant='warning'
            modalOptions='default'
            confirmationText={{
              negativeLabel: 'Cancel',
              positiveLabel: 'Yes',
              title: 'Are you sure want to Save Transfer Request?',
              description: 'You won’t be able to revert this!'
            }}
            alertText={{
              error: {
                title: 'Network Errors.',
                description: 'Unable to connect to the network or server.'
              },
              success: {
                title: 'Successfully save data.',
                description: 'Inventory request has been saved by our system.'
              }
            }}
            variant='solid'
            color='primary'
            text='Save'
            content='textOnly'
          ></ButtonAction>
        </Box>
        <Box>
          <Typography>List Data After Submit: </Typography>
          <Typography>{JSON.stringify(valueSubmit?.rows)}</Typography>
        </Box>
      </>
    )
  }
}
