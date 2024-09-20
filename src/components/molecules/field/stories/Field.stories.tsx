/** React imports */
import React from 'react'

/** Storybook imports */
import { Meta, StoryObj } from '@storybook/react'

/** MUI imports */
import { Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Stack } from '@mui/material'

/** Components imports */
import { Field } from '../components/Field'
import { Input } from '@/components/atoms/input/components/Input'
import { FileUpload } from '@/components/atoms/file-upload/FileUpload'
import { Select, Textarea } from '@/components/atoms'

/** Type imports */
import { FieldProps } from '../types/Field.types'

/** React Hook Form imports */
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

/** Yup imports */
import * as yup from 'yup'

const meta: Meta<typeof Field> = {
  title: 'Components/Molecules/Field',
  component: Field,
  argTypes: {
    label: {
      defaultValue: 'label'
    },
    isRequired: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<FieldProps>

const defaultProps: Partial<FieldProps> = {
  label: 'Input Text',
  children: <Input variant='outlined' type='text' />
}

export const Default: Story = {
  args: defaultProps
}

export const contohWithValidationAndSubmit: Story = {
  render: () => {
    const schema = yup.object().shape({
      sayaSiapa: yup.string().required('Wajib diisi nih')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name='sayaSiapa'
              control={control}
              render={({ field: { name, ...rest }, fieldState }) => {
                return (
                  <Field
                    size='small'
                    label='Saya Siapa?'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    {...rest}
                  >
                    <Input type='text' variant='outlined' />
                  </Field>
                )
              }}
            />
            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const fieldWithTextArea: Story = {
  render: () => {
    const schema = yup.object().shape({
      area: yup.string().required('Ingat wajib diisi')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name='area'
              control={control}
              render={({ field: { name, onChange, ...rest }, fieldState }) => {
                return (
                  <Field
                    size='small'
                    label='Area Text'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    {...rest}
                  >
                    <Textarea onChange={onChange} />
                  </Field>
                )
              }}
            />
            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const FieldWithSelect: Story = {
  render: () => {
    const schema = yup.object().shape({
      pilihAja: yup.object().required('Required dong').nullable()
    })

    const data = [
      { value: '1', label: 'hiking' },
      { value: '2', label: 'mantai' },
      { value: '3', label: 'nonton' }
    ]

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name='pilihAja'
              control={control}
              render={({ field: { onChange, name, value, ref, ...rest }, fieldState }) => {
                return (
                  <Field
                    {...rest}
                    label='Pilih Sesukanya'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                  >
                    <Select
                      selected={value}
                      data={data}
                      size='small'
                      labelKey='label'
                      valueKey='value'
                      onChange={(value: any) => onChange(value)}
                    />
                  </Field>
                )
              }}
            />

            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const FieldWithCheckobox: Story = {
  render: () => {
    const checkboxes = [
      { name: 'nasgor', label: 'Nasi Goreng' },
      { name: 'bakso', label: 'Bakso' },
      { name: 'sate', label: 'Sate' }
    ]

    const schema = yup.object().shape({
      checkinDulu: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required(),
            checked: yup.bool().oneOf([true], 'Pilih minimal 2 makanan favorit mu')
          })
        )
        .required('Pilih minimal 2 makanan favorit mu')
        .min(2, 'Pilih minimal 2 makanan favorit mu')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column'>
            <Controller
              name='checkinDulu'
              control={control}
              render={({ field: { name, value, onChange, ...rest }, fieldState }) => {
                return (
                  <Field
                    {...rest}
                    label='Jangan lupa checkin'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    isCustomHelperText
                  >
                    <FormGroup>
                      {checkboxes.map(checkbox => (
                        <FormControlLabel
                          key={checkbox.name}
                          control={
                            <Checkbox
                              checked={value?.some(v => v.name === checkbox.name && v.checked) || false}
                              onChange={e => {
                                let newValue = value?.map(v =>
                                  v.name === checkbox.name ? { ...v, checked: e.target.checked } : v
                                ) || [{ name: checkbox.name, checked: e.target.checked }]
                                // If the checkbox is being checked and it doesn't exist in the array, add it
                                if (e.target.checked && !newValue.some(v => v.name === checkbox.name)) {
                                  newValue.push({ name: checkbox.name, checked: e.target.checked })
                                }
                                // If the checkbox is being unchecked and it exists in the array, remove it
                                else if (!e.target.checked) {
                                  newValue = newValue.filter(v => v.name !== checkbox.name)
                                }
                                onChange(newValue)
                              }}
                              name={checkbox.name}
                            />
                          }
                          label={checkbox.label}
                        />
                      ))}
                    </FormGroup>
                  </Field>
                )
              }}
            />

            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const FieldWithRadioButton: Story = {
  render: () => {
    const radios = [
      { name: 'setuju', label: 'Setuju' },
      { name: 'ragu', label: 'Ragu' },
      { name: 'tidak', label: 'Tidak' }
    ]

    const schema = yup.object().shape({
      pilihSalahSatu: yup.string().required('Harus pilih satu')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column'>
            <Controller
              name='pilihSalahSatu'
              control={control}
              render={({ field: { name, ...rest }, fieldState }) => {
                return (
                  <Field
                    size='small'
                    label='Pilih Salah Satu Aja'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    isCustomHelperText
                    {...rest}
                  >
                    <RadioGroup>
                      {radios.map(radio => (
                        <FormControlLabel
                          key={radio.name}
                          control={<Radio value={radio.name} name={radio.name} />}
                          label={radio.label}
                        />
                      ))}
                    </RadioGroup>
                  </Field>
                )
              }}
            />

            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const FieldWithUploadFile: Story = {
  render: () => (
    <Field label='Upload aja deh'>
      <FileUpload />
    </Field>
  )
}

export const compoundComponetFieldInput: Story = {
  render: () => {
    const schema = yup.object().shape({
      sayaSiapa: yup.string().required('Wajib diisi nih')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Field name='sayaSiapa' size='small' isRequired>
              <Field.Label>Field Input Compound component</Field.Label>
              <Field.InputController controller={control} errors={errors}>
                <Input type='text' variant='outlined' />
              </Field.InputController>
            </Field>
            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const CompoundComponentFieldSelect: Story = {
  render: () => {
    const schema = yup.object().shape({
      pilihAja: yup.object().required('Required dong')
    })

    const data = [
      { value: '1', label: 'hiking' },
      { value: '2', label: 'mantai' },
      { value: '3', label: 'nonton' }
    ]

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Field name='pilihAja' size='small' isRequired>
              <Field.SelectController controller={control} errors={errors}>
                <Select data={data} labelKey='label' valueKey='value' />
              </Field.SelectController>
              <Field.Label fontWeight='normal'>Field Select Compound component</Field.Label>
            </Field>

            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}

export const CompoundComponentFieldCheckobox: Story = {
  render: () => {
    const checkboxes = [
      { name: 'nasgor', label: 'Nasi Goreng' },
      { name: 'bakso', label: 'Bakso' },
      { name: 'sate', label: 'Sate' }
    ]

    const schema = yup.object().shape({
      checkinDulu: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required(),
            checked: yup.bool().oneOf([true], 'Pilih minimal 2 makanan favorit mu')
          })
        )
        .required('Pilih minimal 2 makanan favorit mu')
        .min(2, 'Pilih minimal 2 makanan favorit mu')
    })

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column'>
            {/* <Controller
              name='checkinDulu'
              control={control}
              render={({ field: { name, value, onChange, ...rest }, fieldState }) => {
                return (
                  <Field
                    {...rest}
                    label='Jangan lupa checkin'
                    isRequired
                    error={fieldState.invalid}
                    helperText={errors && errors[name]?.message}
                    isCustomHelperText
                  >
                    <FormGroup>
                      {checkboxes.map(checkbox => (
                        <FormControlLabel
                          key={checkbox.name}
                          control={
                            <Checkbox
                              checked={value?.some(v => v.name === checkbox.name && v.checked) || false}
                              onChange={e => {
                                let newValue = value?.map(v =>
                                  v.name === checkbox.name ? { ...v, checked: e.target.checked } : v
                                ) || [{ name: checkbox.name, checked: e.target.checked }]
                                // If the checkbox is being checked and it doesn't exist in the array, add it
                                if (e.target.checked && !newValue.some(v => v.name === checkbox.name)) {
                                  newValue.push({ name: checkbox.name, checked: e.target.checked })
                                }
                                // If the checkbox is being unchecked and it exists in the array, remove it
                                else if (!e.target.checked) {
                                  newValue = newValue.filter(v => v.name !== checkbox.name)
                                }
                                onChange(newValue)
                              }}
                              name={checkbox.name}
                            />
                          }
                          label={checkbox.label}
                        />
                      ))}
                    </FormGroup>
                  </Field>
                )
              }}
            /> */}

            <Field name='checkinDulu' size='small' isRequired isCustomHelperText>
              <Field.Label>Field Checkbox Compound component</Field.Label>
              <Field.CheckboxController controller={control} errors={errors}>
                <FormGroup>
                  {checkboxes.map(checkbox => (
                    <FormControlLabel
                      label={checkbox.label}
                      key={checkbox.name}
                      control={
                        <Checkbox
                          name={checkbox.name || ''}
                          // checked={value?.some(v => v.name === checkbox.name && v.checked) || false}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </Field.CheckboxController>
              <Field.HelperText />
            </Field>
            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                console.log('ada error loh', errors)
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    )
  }
}
