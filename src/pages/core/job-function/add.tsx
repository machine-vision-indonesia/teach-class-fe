import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Controller, useForm } from 'react-hook-form'
import { type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Input } from 'src/components/atoms/input'
import { Textarea } from 'src/components/atoms/textarea'
import { Button } from 'src/components/atoms/button'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import * as yup from 'yup'
import { useGetJobLevels } from '../../../components/complexes/job-function/service/list/useGetJobLevels'
import { useMutation } from '@tanstack/react-query'
import client from '../../../client'
import { queryClient } from '../../_app'
import { useRouter } from 'next/router'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import { Modal } from '../../../components/atoms/modal/Modal'
import { Alert } from 'src/components/atoms/alert/Alert'
import { useGetDepartments } from '../../../components/complexes/job-function/service/list/useGetDepartments'
import { isCreateSuccessAtom } from '../../../components/complexes/job-function/atoms'
import { useAtom } from 'jotai'

const schema = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
  jobLevel: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required()
    .default(null),
  department: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .required()
    .default(null),
  description: yup.string()
})

const schemaLevel = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
  parent: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .nullable()
    .default(null)
})

type Schema = InferType<typeof schema>
type SchemaLevel = InferType<typeof schemaLevel>

export default function Page() {
  const router = useRouter()
  const theme = useTheme()
  const [JobLevelsSearch, setJobLevelsSearch] = useState('')
  const debouncedJobLevels = useDebounce(JobLevelsSearch, 1000)
  const jobLevels = useGetJobLevels({ search: debouncedJobLevels })
  const [addLevelModalOpen, setAddLevelModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmModalLevelOpen, setConfirmModalLevelOpen] = useState(false)
  const [isAddLevelSuccess, setIsAddLevelSuccess] = useState(false)
  const [isAddLevelFailed, setIsAddLevelFailed] = useState(false)
  const [departmentsSearch, setDepartmentsSearch] = useState('')
  const debouncedDepartmentsSearch = useDebounce(departmentsSearch, 1000)
  const departments = useGetDepartments({ search: debouncedDepartmentsSearch })
  const [, setIsCreateSuccess] = useAtom(isCreateSuccessAtom)
  const [isAddJFFailed, setIsAddJFFailed] = useState(false)

  const departmentOptions =
    departments.data?.map(department => ({
      id: department.id,
      label: department.label
    })) ?? []

  const jobLevelOptions =
    jobLevels.data?.map(jobLevel => ({
      id: jobLevel.id,
      label: jobLevel.label
    })) ?? []

  const addLevelForm = useForm<SchemaLevel>({
    resolver: yupResolver(schemaLevel)
  })

  const form = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const jobLevelDrp =
    jobLevels.data?.map(jobLevel => ({
      id: jobLevel.id,
      label: jobLevel.label
    })) ?? []

  const createJobFunctionMutation = useMutation({
    async mutationFn(data: Schema) {
      const codeJF = data.code
      const response = await client.api.get('/items/mt_job_functions', {
        params: {
          filter: {
            code: {
              _eq: codeJF
            }
          }
        }
      })
      if (response.data.data.length) {
        throw new Error('Code already exists')
      }

      return client.api.post('/items/mt_job_functions', {
        description: data.description,
        code: data.code,
        name: data.name,
        job_level: data.jobLevel?.id,
        sto: data.department?.id,
        status: 'published'
      })
    }
  })

  async function onAddSubmit() {
    try {
      const data = form.getValues()
      await createJobFunctionMutation.mutateAsync(data)
      await queryClient.invalidateQueries()
      router.push('/core/job-function')
      setIsCreateSuccess(true)
      createJobFunctionMutation.reset()
    } catch (e) {
      if (e instanceof Error && e.message == 'Code already exists') {
        setConfirmModalOpen(false)
        form.setError('code', {
          type: 'manual',
          message: 'code already exists'
        })
        setIsAddJFFailed(true)
      } else {
        setConfirmModalOpen(false)
        setIsAddJFFailed(true)
      }
    }
  }

  const createJobLevelMutation = useMutation({
    async mutationFn(data: SchemaLevel) {
      const codeLevel = data.code
      const response = await client.api.get('/items/mt_job_levels', {
        params: {
          filter: {
            code: {
              _eq: codeLevel
            }
          }
        }
      })
      if (response.data.data.length) {
        throw new Error('Code job level already exists')
      }
      const id_number = jobLevels.data?.length ? jobLevels.data.length + 1 : 1

      return client.api.post('/items/mt_job_levels', {
        id_number: id_number.toString(),
        code: data.code,
        name: data.name,
        status: 'published',
        parent: data.parent?.id ?? null
      })
    }
  })

  async function onAddSubmitConfirmAddLevel() {
    const data = addLevelForm.getValues()
    try {
      await createJobLevelMutation.mutateAsync(data)
      await queryClient.invalidateQueries()
      setAddLevelModalOpen(false)
      setConfirmModalLevelOpen(false)
      setIsAddLevelSuccess(true)
      addLevelForm.reset({
        name: '',
        parent: null
      })
      createJobLevelMutation.reset()
    } catch (e) {
      if (e instanceof Error && e.message == 'Code job level already exists') {
        setConfirmModalLevelOpen(false)
        addLevelForm.setError('code', {
          type: 'manual',
          message: 'Code already exists'
        })
      } else {
        setAddLevelModalOpen(false)
        setConfirmModalLevelOpen(false)
        setIsAddLevelFailed(true)
      }
    }
  }

  useEffect(() => {
    if (!isAddLevelSuccess) {
      return
    }
    setTimeout(() => {
      setIsAddLevelSuccess(false)
    }, 4000)
  }, [isAddLevelSuccess])

  useEffect(() => {
    if (!isAddLevelFailed) {
      return
    }
    setTimeout(() => {
      setIsAddLevelFailed(false)
    }, 4000)
  }, [isAddLevelFailed])

  useEffect(() => {
    if (!isAddJFFailed) {
      return
    }
    setTimeout(() => {
      setIsAddJFFailed(false)
    }, 4000)
  }, [isAddJFFailed])

  return (
    <>
      <main>
        <Typography variant='h2'>Add Job Function</Typography>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ mt: '8px' }}
          separator={<Icon icon='mdi:chevron-right' color='#909094' />}
        >
          <Link component={NextLink} href='/'>
            <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
          </Link>
          <Link component={NextLink} href='/core/job-function'>
            <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
              Manage Job Function
            </Typography>
          </Link>
          <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
            Add Job Function
          </Typography>
        </Breadcrumbs>

        <Card
          sx={{
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
            padding: '20px',
            flex: '1 1 0%',
            marginTop: '24.5px'
          }}
        >
          <CardContent style={{ padding: 0 }}>
            <form
              onSubmit={form.handleSubmit(() => {
                setConfirmModalOpen(true)
              })}
            >
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
                    Job Function Form
                  </Typography>

                  <Typography
                    variant='caption'
                    component='p'
                    style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
                  >
                    Complete the data to add a Job Function
                  </Typography>
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
                    Department <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>

                  <Controller
                    control={form.control}
                    name='department'
                    render={({ field: { value, onChange, ...rest }, fieldState }) => (
                      <div style={{ gridColumn: 'span 3' }}>
                        <Autocomplete
                          options={departmentOptions}
                          size='small'
                          id={rest.name}
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
                          onChange={(_, value) => onChange(value)}
                          onInputChange={(_, value, reason) => {
                            if (reason === 'input') {
                              setDepartmentsSearch(value)
                            }
                          }}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={params => (
                            <TextField
                              color={fieldState.invalid ? 'error' : 'primary'}
                              {...params}
                              placeholder={'Select Department'}
                            />
                          )}
                          loading={departments.isLoading}
                          filterOptions={options => options}
                          value={value || null}
                          {...rest}
                        />

                        {fieldState.invalid ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{fieldState.error?.message}</FormHelperText>
                        ) : null}
                      </div>
                    )}
                  />
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
                    Job Function Code <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>
                  <Controller
                    control={form.control}
                    name='code'
                    defaultValue=''
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Input
                        fullWidth
                        type='text'
                        id='name'
                        inputRef={ref}
                        variant='filled'
                        placeholder='Job Function Code'
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
                    Job Function Name <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>
                  <Controller
                    control={form.control}
                    name='name'
                    defaultValue=''
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Input
                        fullWidth
                        type='text'
                        id='name'
                        inputRef={ref}
                        variant='filled'
                        placeholder='Job Function Name'
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
                    htmlFor='level'
                    style={{
                      display: 'inline-block',
                      color: theme.palette.text.secondary,
                      fontSize: '14px',
                      letterSpacing: '.25px'
                    }}
                  >
                    Job Level <span style={{ color: theme.palette.error.main }}>*</span>
                  </label>

                  <Controller
                    control={form.control}
                    name='jobLevel'
                    render={({ field: { value, onChange, ...rest }, fieldState }) => (
                      <div style={{ gridColumn: 'span 3' }}>
                        <Autocomplete
                          options={jobLevelOptions}
                          size='small'
                          id={rest.name}
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
                          onChange={(_, value) => onChange(value)}
                          onInputChange={(_, value, reason) => {
                            if (reason === 'input') {
                              setJobLevelsSearch(value)
                            }
                          }}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={params => (
                            <TextField
                              color={fieldState.invalid ? 'error' : 'primary'}
                              {...params}
                              placeholder={'Select Title'}
                            />
                          )}
                          loading={jobLevels.isLoading}
                          filterOptions={options => options}
                          value={value || null}
                          {...rest}
                        />

                        {fieldState.invalid ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{fieldState.error?.message}</FormHelperText>
                        ) : null}
                      </div>
                    )}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    component='button'
                    type='button'
                    onClick={() => {
                      addLevelForm.reset({
                        code: '',
                        name: '',
                        parent: null
                      })
                      setAddLevelModalOpen(true)
                    }}
                  >
                    + Add New Level
                  </Link>
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
                    defaultValue=''
                    render={({ field: { ref, ...rest }, fieldState }) => (
                      <Textarea
                        id='description'
                        fullWidth
                        inputRef={ref}
                        placeholder='Description'
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
                  {/*{form.formState.errors.description ? (
                  <FormHelperText sx={{color: 'error.main'}}>
                    {form.formState.errors.description.message}
                  </FormHelperText>
                ) : null}*/}
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
                  href='/core/job-function'
                />
                <Button
                  variant='contained'
                  content='textOnly'
                  text='Submit'
                  size='large'
                  sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                  type='submit'
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Dialog
        fullWidth
        open={addLevelModalOpen}
        scroll='body'
        onClose={() => setAddLevelModalOpen(false)}
        PaperProps={{
          style: {
            maxWidth: '530px'
          }
        }}
      >
        <DialogContent
          sx={{
            position: 'relative',
            padding: '0px !important'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateAreas: `'. column2 column3'`,
              alignItems: 'center',
              boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.15)',
              padding: '20px 24px 10px'
            }}
          >
            <Typography variant='h4' style={{ textAlign: 'center', gridArea: 'column2' }}>
              Add Job Level
            </Typography>
            <div style={{ textAlign: 'right', gridArea: 'column3' }}>
              <IconButton onClick={() => setAddLevelModalOpen(false)} style={{ padding: '6px' }}>
                <Icon icon='mdi:close' color={theme.palette.secondary.main} />
              </IconButton>
            </div>
          </div>
          <form
            onSubmit={addLevelForm.handleSubmit(() => {
              setConfirmModalLevelOpen(true)
            })}
            style={{ padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
              <div>
                <Controller
                  control={addLevelForm.control}
                  name='code'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <>
                      <label
                        htmlFor={rest.name}
                        style={{
                          display: 'inline-block',
                          color: theme.palette.text.secondary,
                          fontSize: '14px',
                          letterSpacing: '.25px'
                        }}
                      >
                        Code <span style={{ color: theme.palette.error.main }}>*</span>
                      </label>

                      <Input
                        fullWidth
                        type='text'
                        id={rest.name}
                        variant='filled'
                        color={fieldState.invalid ? 'error' : 'primary'}
                        placeholder='Code'
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
                        inputRef={ref}
                        {...rest}
                      />
                    </>
                  )}
                />

                {addLevelForm.formState.errors.code ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {addLevelForm.formState.errors.code.message}
                  </FormHelperText>
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
                  Name <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={addLevelForm.control}
                  name='name'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id={rest.name}
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Name'
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
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />

                {addLevelForm.formState.errors.name ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {addLevelForm.formState.errors.name.message}
                  </FormHelperText>
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
                  Parent
                </label>

                <Controller
                  control={addLevelForm.control}
                  name='parent'
                  render={({ field: { value, onChange, ...rest }, fieldState }) => (
                    <Autocomplete
                      options={jobLevelDrp}
                      size='small'
                      id='parent'
                      placeholder='Select Parent'
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
                      onChange={(_, value) => onChange(value)}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={params => {
                        return (
                          <TextField
                            color={fieldState.invalid ? 'error' : 'primary'}
                            placeholder='Select Parent'
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
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
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
                onClick={() => setAddLevelModalOpen(false)}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Submit'
                size='large'
                sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                type='submit'
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Modal
        isOpen={confirmModalLevelOpen}
        onClose={() => setConfirmModalLevelOpen(false)}
        variant='warning'
        loading={createJobLevelMutation.isLoading || createJobLevelMutation.isSuccess}
        positiveLabel='Yes'
        title='Are you sure to add job level?'
        onOk={onAddSubmitConfirmAddLevel}
      />

      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        variant='warning'
        loading={createJobFunctionMutation.isLoading || createJobFunctionMutation.isSuccess}
        positiveLabel='Yes'
        title='Are you sure to create job function ?'
        onOk={onAddSubmit}
      />
      {isAddLevelSuccess ? (
        <Box position='fixed' top='85px' right='24px'>
          <Alert
            variant='contained'
            content='Your job level was success to submitted'
            color='success'
            title='Submit Successful'
            icon='ic:baseline-check'
            onClose={() => setIsAddLevelSuccess(false)}
          />
        </Box>
      ) : null}
      {isAddLevelFailed ? (
        <Box position='fixed' top='85px' right='24px'>
          <Alert
            variant='contained'
            content='Your job level was failed to submitted'
            color='error'
            title='Submit Failed'
            icon='ic:baseline-do-disturb'
            onClose={() => setIsAddLevelFailed(false)}
          />
        </Box>
      ) : null}
      {isAddJFFailed ? (
        <Box position='fixed' top='85px' right='24px'>
          <Alert
            variant='contained'
            content='Your job function was failed to submitted'
            color='error'
            title='Submit Failed'
            icon='ic:baseline-do-disturb'
            onClose={() => setIsAddJFFailed(false)}
          />
        </Box>
      ) : null}
    </>
  )
}
