import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Input } from 'src/components/atoms/input'
import { Textarea } from 'src/components/atoms/textarea'
import { Button } from 'src/components/atoms/button'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import client from '../../../../client'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../../hooks/useDebounce'
import { CircularProgress } from '../../../../components/atoms/circular-progress/CircularProgress'
import Box from '@mui/material/Box'
import { useGetDepartment } from 'src/components/complexes/department/service/edit/useGetDepartment'
import { Alert } from 'src/components/atoms/alert/Alert'
import { useAtom } from 'jotai'
import { departmentAlertAtom } from 'src/components/complexes/department/atoms'
import { Modal } from 'src/components/atoms/modal/Modal'
import { queryClient } from 'src/pages/_app'
import { useGetDepartmentLevels } from 'src/components/complexes/department/service/edit/useGetDepartmentLevels'
import { useGetDepartments } from 'src/components/complexes/department/service/edit/useGetDepartments'

const schema = yup.object().shape({
  code: yup.string().required('Department Code is a required field').min(1).default(''),
  name: yup.string().required('Department Name is a required field').min(1).default(''),
  parent: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .nullable()
    .default(null),
  level: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required('Department Level is a required field')
    .default(null),
  description: yup.string().default('')
})

type Schema = yup.InferType<typeof schema>

function useUpdateDepartment() {
  return useMutation({
    async mutationFn(data: Schema & { id: string }) {
      return client.api.patch(`/items/mt_departments/${data.id}`, {
        parent: data.parent?.id ?? null,
        code: data.code,
        department_level: data.level.id,
        name: data.name,
        description: data.description || null
      })
    }
  })
}

export default function ManageDepartmentsEditPage() {
  const theme = useTheme()
  const router = useRouter()

  const department = useGetDepartment({ id: router.query.id as string, enabled: router.isReady })

  const { reset, ...form } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (department.isSuccess) {
      reset({
        code: department.data.data.code,
        name: department.data.data.name,
        parent: department.data.data.parent
          ? {
              id: department.data.data.parent.id,
              label: department.data.data.parent.name
            }
          : null,
        level: {
          id: department.data.data.department_level.id,
          label: department.data.data.department_level.name
        },
        description: department.data.data.description ?? ''
      })
    }
  }, [
    department.data?.data.code,
    department.data?.data.department_level.id,
    department.data?.data.department_level.name,
    department.data?.data.description,
    department.data?.data.name,
    department.data?.data.parent,
    department.isSuccess,
    reset
  ])

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [departmentAlert, setDepartmentAlert] = useAtom(departmentAlertAtom)

  useEffect(() => {
    if (!departmentAlert.open) {
      return
    }

    setTimeout(() => {
      setDepartmentAlert({
        ...departmentAlert,
        open: false
      })
    }, 4000)
  }, [setDepartmentAlert, departmentAlert])

  const [parentDepartment, setParentDepartment] = useState('')
  const debouncedParentDepartment = useDebounce(parentDepartment, 1000)
  const parent = useGetDepartments({
    search: debouncedParentDepartment,
    excludedId: router.query.id as string,
    enabled: router.isReady
  })

  const [departmentLevels, setDeparmentLevels] = useState('')
  const debouncedDepartmentLevel = useDebounce(departmentLevels, 1000)
  const level = useGetDepartmentLevels({ search: debouncedDepartmentLevel })
  const levelOptions =
    level.data?.data.map(child => ({
      id: child.id,
      label: child.name
    })) ?? []

  const updateDepartment = useUpdateDepartment()

  async function onSubmit(data: Schema) {
    type Department = {
      id: string
    }

    type GetDepartmentsResponse = {
      data: Department[]
    }

    const response = await client.api.get<GetDepartmentsResponse>('/items/mt_departments', {
      params: {
        filter: {
          code: {
            _eq: data.code
          },
          id: {
            _neq: router.query.id
          }
        },
        fields: ['id'].toString()
      }
    })

    if (response.data.data.length) {
      form.setError('code', {
        type: 'manual',
        message: 'Department Code already exists'
      })

      return
    }

    setConfirmModalOpen(true)
  }

  return (
    <main>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant='h2'>Edit Department</Typography>
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{ mt: '8px' }}
            separator={<Icon icon='mdi:chevron-right' color='#909094' />}
          >
            <Link component={NextLink} href='/'>
              <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
            </Link>
            <Link component={NextLink} href='/core/department'>
              <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
                Manage Department
              </Typography>
            </Link>
            <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
              Edit Department
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      <Card
        sx={{
          boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
          flex: '1 1 0%',
          marginTop: '24.5px'
        }}
      >
        <CardContent style={{ padding: 0 }}>
          {department.isLoading ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CircularProgress />
            </div>
          ) : null}

          {department.isSuccess ? (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  rowGap: '15px',
                  columnGap: '20px'
                }}
              >
                <div style={{ gridColumn: 'span 2' }}>
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 500, lineHeight: '26px', fontSize: '16px' }}
                    component='h2'
                  >
                    Department Form
                  </Typography>

                  <Typography
                    variant='caption'
                    component='p'
                    style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
                  >
                    Complete the data to edit a Department
                  </Typography>
                </div>

                <div>
                  <label
                    htmlFor='code'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Department Code <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>
                  <Controller
                    control={form.control}
                    name='code'
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Input
                        fullWidth
                        type='text'
                        id='code'
                        inputRef={ref}
                        variant='filled'
                        placeholder='Department Code'
                        color={fieldState.invalid ? 'error' : 'primary'}
                        sx={{
                          marginTop: '4px',
                          ...(fieldState.invalid
                            ? {
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'error.main'
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'error.main'
                                  }
                                }
                              }
                            : {})
                        }}
                        {...rest}
                      />
                    )}
                  />
                  {form.formState.errors.code ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.code.message}</FormHelperText>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor='name'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Department Name <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>
                  <Controller
                    control={form.control}
                    name='name'
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Input
                        fullWidth
                        type='text'
                        id='name'
                        inputRef={ref}
                        variant='filled'
                        placeholder='Department Name'
                        color={fieldState.invalid ? 'error' : 'primary'}
                        sx={{
                          marginTop: '4px',
                          ...(fieldState.invalid
                            ? {
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'error.main'
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'error.main'
                                  }
                                }
                              }
                            : {})
                        }}
                        {...rest}
                      />
                    )}
                  />
                  {form.formState.errors.name ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.name.message}</FormHelperText>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor='parent'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Parent Department
                  </label>

                  <Controller
                    control={form.control}
                    name='parent'
                    render={({ field: { value, onChange, ...rest }, fieldState }) => (
                      <Autocomplete
                        options={parent.data ?? []}
                        size='small'
                        id='parent'
                        sx={{
                          marginTop: '4px',
                          ...(fieldState.invalid
                            ? {
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'error.main'
                                  }
                                }
                              }
                            : {})
                        }}
                        onInputChange={(_, value, reason) => {
                          if (reason === 'input') {
                            setParentDepartment(value)
                          }
                        }}
                        onChange={(_, value) => onChange(value)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={params => {
                          return (
                            <TextField
                              color={fieldState.invalid ? 'error' : 'primary'}
                              placeholder='Select Parent Department'
                              {...params}
                            />
                          )
                        }}
                        filterOptions={options => options}
                        value={value || null}
                        {...rest}
                      />
                    )}
                  />

                  {form.formState.errors.parent ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.parent.message}</FormHelperText>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor='level'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Department Level <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>

                  <Controller
                    control={form.control}
                    name='level'
                    render={({ field: { value, onChange, ...rest }, fieldState }) => (
                      <Autocomplete<(typeof levelOptions)[number]>
                        options={levelOptions}
                        size='small'
                        id='level'
                        sx={{
                          marginTop: '4px',
                          ...(fieldState.invalid
                            ? {
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'error.main'
                                  }
                                }
                              }
                            : {})
                        }}
                        onInputChange={(_, value, reason) => {
                          if (reason === 'input') {
                            setDeparmentLevels(value)
                          }
                        }}
                        onChange={(_, value) => onChange(value)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={params => {
                          return (
                            <TextField
                              color={fieldState.invalid ? 'error' : 'primary'}
                              placeholder='Select Level Department'
                              {...params}
                            />
                          )
                        }}
                        filterOptions={options => options}
                        value={value || null}
                        {...rest}
                      />
                    )}
                  />

                  {form.formState.errors.level ? (
                    <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.level.message}</FormHelperText>
                  ) : null}
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label
                    htmlFor='description'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Description
                  </label>
                  <Controller
                    control={form.control}
                    name='description'
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Textarea
                        id='description'
                        fullWidth
                        inputRef={ref}
                        color={fieldState.invalid ? 'error' : 'primary'}
                        sx={{
                          marginTop: '4px',
                          ...(fieldState.invalid
                            ? {
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'error.main'
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'error.main'
                                  }
                                }
                              }
                            : {})
                        }}
                        {...rest}
                      />
                    )}
                  />
                  {form.formState.errors.description ? (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {form.formState.errors.description.message}
                    </FormHelperText>
                  ) : null}
                </div>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant='outlined'
                  content='textOnly'
                  text='Cancel'
                  color='primary'
                  size='large'
                  sx={{
                    height: '44px',
                    padding: '12.5px 20px !important',
                    borderRadius: '4px',
                    fontSize: '16px',
                    border: `1.5px solid ${theme.palette.primary.main}`
                  }}
                  type='button'
                  LinkComponent={NextLink}
                  href='/core/department'
                />

                <Button
                  disabled={form.formState.isSubmitting}
                  variant='contained'
                  content='textOnly'
                  text='Submit'
                  size='large'
                  sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                  type='submit'
                  loading={form.formState.isSubmitting}
                />
              </div>
            </form>
          ) : null}
        </CardContent>
      </Card>

      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        variant='warning'
        loading={(updateDepartment.isLoading || updateDepartment.isSuccess) && !updateDepartment.isPaused}
        positiveLabel='Yes'
        title='Are you sure you want to edit this department?'
        onOk={async () => {
          try {
            await updateDepartment.mutateAsync({
              ...form.getValues(),
              id: router.query.id as string
            })

            await queryClient.invalidateQueries()

            setDepartmentAlert({
              title: 'Submit Successful',
              content: 'Your department was success to edited',
              color: 'success',
              icon: 'ic:baseline-check',
              pathname: '/core/department',
              open: true
            })
          } catch {
            setDepartmentAlert({
              title: 'Submit Failed',
              content: 'Your department was failed to edited',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              pathname: '/core/department',
              open: true
            })
          }

          router.push('/core/department')
        }}
      />

      {departmentAlert.pathname === router.pathname && departmentAlert.open ? (
        <Box position='fixed' top='85px' right='24px'>
          <Alert
            variant='contained'
            content={departmentAlert.content}
            color={departmentAlert.color}
            title={departmentAlert.title}
            icon={departmentAlert.icon}
            onClose={() => setDepartmentAlert({ ...departmentAlert, open: false })}
          />
        </Box>
      ) : null}
    </main>
  )
}
