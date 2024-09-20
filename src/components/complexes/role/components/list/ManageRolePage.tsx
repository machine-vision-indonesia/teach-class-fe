import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import { Button } from 'src/components/atoms/button'
import { useTheme } from '@mui/material/styles'
import { Input } from 'src/components/atoms/input'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Textarea } from 'src/components/atoms/textarea'
import Box from '@mui/material/Box'
import { Modal } from 'src/components/atoms/modal/Modal'
import { queryClient } from '../../../../../pages/_app'
import { useDeleteRole } from '../../service/list/useDeleteRole'
import { useMutation } from '@tanstack/react-query'
import client from '../../../../../client'
import { Alert, type PropsAlert } from 'src/components/atoms/alert/Alert'
import { useGetParents } from '../../service/list/useGetParents'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { TableAsync } from 'src/components/molecules/table-async/TableAsync'
import { type GridRenderCellParams, type GridValueGetterParams } from '@mui/x-data-grid'
import { GetTableRoles, type GetTableRolesResponse } from '../../service/list/GetTableRoles.service'
import { GetDropdownRoles } from '../../service/list/GetDropdownRoles.service'

const schema = yup.object().shape({
  code: yup.string().required('Code is a required field').min(1),
  name: yup.string().required('Name is a required field').min(1),
  parent: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .nullable()
    .default(null),
  description: yup.string()
})

type Schema = yup.InferType<typeof schema>

type Alert = {
  title: string
  content: string
  color: PropsAlert['color']
  icon: 'ic:baseline-check' | 'ic:baseline-do-disturb'
  open: boolean
}

type Role = {
  id: string
}

type GetRolesResponse = {
  data: Role[]
}

export default function ManageRolePage() {
  const theme = useTheme()
  const [toBeDeletedRole, setToBeDeletedRole] = useState<NonNullable<string>>()
  const [toBeEditedRole, setToBeEditedRole] = useState<GetTableRolesResponse['data'][number]>()
  const [toBeDetailedRole, setToBeDetailedRole] = useState<GetTableRolesResponse['data'][number]>()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const deleteRole = useDeleteRole()
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmEditModalOpen, setConfirmEditModalOpen] = useState(false)

  const [alert, setAlert] = useState<Alert>({
    title: '',
    content: '',
    color: 'success',
    icon: 'ic:baseline-check',
    open: false
  })

  useEffect(() => {
    if (!alert.open) {
      return
    }

    window.scrollTo(0, 0)

    setTimeout(() => {
      setAlert({
        ...alert,
        open: false
      })
    }, 4000)
  }, [alert])

  const parents = useGetParents()

  const roleOptions =
    parents.data?.map(role => ({
      id: role.id,
      label: role.name
    })) ?? []

  const createMutation = useMutation({
    async mutationFn(data: Schema) {
      return client.api.post('/items/mt_roles', {
        description: data.description,
        code: data.code,
        name: data.name,
        parent: data.parent?.id,
        status: 'published'
      })
    }
  })

  const updateMutation = useMutation({
    async mutationFn(data: Schema) {
      return client.api.patch(`/items/mt_roles/${toBeEditedRole?.id}`, {
        description: data.description,
        code: data.code,
        name: data.name,
        parent: data.parent?.id
      })
    }
  })

  const addForm = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      parent: null
    }
  })

  const editForm = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      parent: null
    }
  })

  async function onAddSubmitConfirm() {
    try {
      const data = addForm.getValues()
      await createMutation.mutateAsync(data)
      await queryClient.invalidateQueries()

      setAddModalOpen(false)
      setConfirmModalOpen(false)

      setAlert({
        title: 'Submit Successful',
        content: 'Your role was success to submitted',
        color: 'success',
        icon: 'ic:baseline-check',
        open: true
      })

      createMutation.reset()
    } catch {
      setAddModalOpen(false)
      setConfirmModalOpen(false)

      setAlert({
        title: 'Submit Failed',
        content: 'Your role was failed to submitted',
        color: 'error',
        icon: 'ic:baseline-do-disturb',
        open: true
      })
    }
  }

  async function onEditSubmitConfirm() {
    try {
      const data = editForm.getValues()
      await updateMutation.mutateAsync(data)
      await queryClient.invalidateQueries()

      setEditModalOpen(false)
      setConfirmEditModalOpen(false)

      setAlert({
        title: 'Edit Successful',
        content: 'Your role was success to edited',
        color: 'success',
        icon: 'ic:baseline-check',
        open: true
      })

      updateMutation.reset()
    } catch {
      setEditModalOpen(false)
      setConfirmEditModalOpen(false)

      setAlert({
        title: 'Edit Failed',
        content: 'Your role was failed to edited',
        color: 'error',
        icon: 'ic:baseline-do-disturb',
        open: true
      })
    }
  }

  return (
    <main>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '24px' }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant='h2'>Manage Role</Typography>
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{ mt: '8px' }}
            separator={<Icon icon='mdi:chevron-right' color='#909094' />}
          >
            <Link component={NextLink} href='/'>
              <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
            </Link>
            <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
              Manage Role
            </Typography>
          </Breadcrumbs>
        </div>

        {alert.open ? (
          <Alert
            variant='contained'
            content={alert.content}
            color={alert.color}
            title={alert.title}
            icon={alert.icon}
            onClose={() => setAlert({ ...alert, open: false })}
          />
        ) : null}

        <Button
          variant='contained'
          content='iconText'
          icon='mdi:plus'
          text='Add Role'
          size='large'
          sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
          onClick={() => {
            addForm.reset({
              parent: null,
              code: '',
              name: '',
              description: ''
            })
            setAddModalOpen(true)
          }}
        />
      </div>

      <TableAsync
        isStripped
        columns={[
          {
            field: 'code',
            headerName: 'Code',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            searchable: true
          },
          {
            field: 'name',
            headerName: 'Role',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            searchable: true
          },
          {
            field: 'parent.name',
            headerName: 'Parent',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            searchable: true,
            valueGetter: (params: GridValueGetterParams<GetTableRolesResponse['data'][number]>) => {
              return params.row.parent?.name ?? '-'
            }
          },
          {
            field: 'count',
            headerName: 'Jumlah User',
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            searchable: false,
            renderCell: (params: GridRenderCellParams<GetTableRolesResponse['data'][number]>) => {
              return (
                <Link component={NextLink} href={`/core/role/${params.row.id}/users`}>
                  {params.row.count} users
                </Link>
              )
            }
          },
          {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            maxWidth: 146,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams<GetTableRolesResponse['data'][number]>) => {
              return (
                <Box display='flex' alignItems='center' columnGap='16px' justifyContent='center' width='100%'>
                  <IconButton
                    style={{ padding: 0, minWidth: 'auto', color: theme.palette.brand.second }}
                    type='button'
                    onClick={() => {
                      setEditModalOpen(true)
                      setToBeEditedRole(params.row)
                      editForm.reset({
                        parent:
                          params.row.parent != null
                            ? {
                                id: params.row.parent.id,
                                label: params.row.parent.name
                              }
                            : null,
                        code: params.row.code,
                        name: params.row.name,
                        description: params.row.description
                      })
                    }}
                  >
                    <Icon icon='mdi:pencil-outline' fontSize='22px' />
                  </IconButton>
                  <IconButton
                    style={{ padding: 0, minWidth: 'auto', color: theme.palette.primary.main }}
                    type='button'
                    onClick={() => {
                      setDetailModalOpen(true)
                      setToBeDetailedRole(params.row)
                    }}
                  >
                    <Icon icon='mdi:eye-outline' fontSize='22px' />
                  </IconButton>
                  <IconButton
                    style={{ padding: 0, minWidth: 'auto', color: theme.palette.error.main }}
                    type='button'
                    onClick={() => {
                      setToBeDeletedRole(params.row.id)
                      setDeleteModalOpen(true)
                    }}
                  >
                    <Icon icon='mdi:delete-outline' fontSize='22px' />
                  </IconButton>
                </Box>
              )
            },
            headerAlign: 'center'
          }
        ]}
        dataFetchService={GetTableRoles}
        filters={[
          {
            type: 'dropdown-multiple',
            name: 'Parent',
            labelKey: 'name',
            field: 'parent',
            dataFetchService: GetDropdownRoles
          }
        ]}
      />

      <Dialog
        fullWidth
        open={addModalOpen}
        scroll='body'
        onClose={() => setAddModalOpen(false)}
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
              Add Role
            </Typography>
            <div style={{ textAlign: 'right', gridArea: 'column3' }}>
              <IconButton
                onClick={() => setAddModalOpen(false)}
                style={{ padding: '6px' }}
                disabled={addForm.formState.isSubmitting}
              >
                <Icon icon='mdi:close' color={theme.palette.secondary.main} />
              </IconButton>
            </div>
          </div>
          <form
            onSubmit={addForm.handleSubmit(async data => {
              const response = await client.api.get<GetRolesResponse>('/items/mt_roles', {
                params: {
                  filter: {
                    code: {
                      _eq: data.code
                    }
                  },
                  fields: ['id'].toString()
                }
              })

              if (response.data.data.length) {
                addForm.setError('code', {
                  type: 'manual',
                  message: 'Role Code already exists'
                })

                return
              }

              setConfirmModalOpen(true)
            })}
            style={{ padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
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
                  Role Code <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={addForm.control}
                  name='code'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='code'
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Role Code'
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

                {addForm.formState.errors.code ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{addForm.formState.errors.code.message}</FormHelperText>
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
                  Role Name <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={addForm.control}
                  name='name'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='name'
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Role Name'
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

                {addForm.formState.errors.name ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{addForm.formState.errors.name.message}</FormHelperText>
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
                  control={addForm.control}
                  name='parent'
                  render={({ field: { value, onChange, ...rest }, fieldState }) => (
                    <Autocomplete
                      options={roleOptions}
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

                {addForm.formState.errors.parent ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {addForm.formState.errors.parent.message}
                  </FormHelperText>
                ) : null}
              </div>
              <div>
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
                  control={addForm.control}
                  name='description'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Textarea
                      id='description'
                      fullWidth
                      inputRef={ref}
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Description'
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

                {addForm.formState.errors.description ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {addForm.formState.errors.description.message}
                  </FormHelperText>
                ) : null}
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
                onClick={() => setAddModalOpen(false)}
                disabled={addForm.formState.isSubmitting}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Submit'
                size='large'
                sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                type='submit'
                disabled={addForm.formState.isSubmitting}
                loading={addForm.formState.isSubmitting}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        open={editModalOpen}
        scroll='body'
        onClose={() => setEditModalOpen(false)}
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
              Edit Role
            </Typography>
            <div style={{ textAlign: 'right', gridArea: 'column3' }}>
              <IconButton
                onClick={() => setEditModalOpen(false)}
                style={{ padding: '6px' }}
                disabled={editForm.formState.isSubmitting}
              >
                <Icon icon='mdi:close' color={theme.palette.secondary.main} />
              </IconButton>
            </div>
          </div>
          <form
            onSubmit={editForm.handleSubmit(async data => {
              const response = await client.api.get<GetRolesResponse>('/items/mt_roles', {
                params: {
                  filter: {
                    code: {
                      _eq: data.code
                    },
                    id: {
                      _neq: toBeEditedRole?.id
                    }
                  },
                  fields: ['id'].toString()
                }
              })

              if (response.data.data.length) {
                editForm.setError('code', {
                  type: 'manual',
                  message: 'Role Code already exists'
                })

                return
              }

              setConfirmEditModalOpen(true)
            })}
            style={{ padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
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
                  Role Code <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={editForm.control}
                  name='code'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='code'
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Role Code'
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

                {editForm.formState.errors.code ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{editForm.formState.errors.code.message}</FormHelperText>
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
                  Role Name <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={editForm.control}
                  name='name'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='name'
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Role Name'
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

                {editForm.formState.errors.name ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{editForm.formState.errors.name.message}</FormHelperText>
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
                  control={editForm.control}
                  name='parent'
                  render={({ field: { value, onChange, ...rest }, fieldState }) => (
                    <Autocomplete
                      options={roleOptions}
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

                {editForm.formState.errors.parent ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {editForm.formState.errors.parent.message}
                  </FormHelperText>
                ) : null}
              </div>
              <div>
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
                  control={editForm.control}
                  name='description'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Textarea
                      id='description'
                      fullWidth
                      inputRef={ref}
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Description'
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

                {editForm.formState.errors.description ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {editForm.formState.errors.description.message}
                  </FormHelperText>
                ) : null}
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
                onClick={() => setEditModalOpen(false)}
                disabled={editForm.formState.isSubmitting}
              />

              <Button
                variant='contained'
                content='textOnly'
                text='Submit'
                size='large'
                sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                type='submit'
                loading={editForm.formState.isSubmitting}
                disabled={editForm.formState.isSubmitting}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        open={detailModalOpen}
        scroll='body'
        onClose={() => {
          editForm.reset({
            parent: null,
            code: '',
            name: '',
            description: ''
          })

          setDetailModalOpen(false)
        }}
        PaperProps={{
          style: {
            maxWidth: '530px'
          }
        }}
      >
        {toBeDetailedRole != null ? (
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
                Detail Role
              </Typography>
              <div style={{ textAlign: 'right', gridArea: 'column3' }}>
                <IconButton onClick={() => setDetailModalOpen(false)} style={{ padding: '6px' }}>
                  <Icon icon='mdi:close' color={theme.palette.secondary.main} />
                </IconButton>
              </div>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Role Code :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    {toBeDetailedRole.code}
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Role Name :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    {toBeDetailedRole.name}
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Parent :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    {toBeDetailedRole.parent?.name ?? '-'}
                  </Typography>
                </div>
                <div style={{ flexBasis: '50%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Jumlah User :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    {toBeDetailedRole.count} users
                  </Typography>
                </div>
                <div style={{ flexBasis: '100%' }}>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                  >
                    Description :
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                  >
                    {toBeDetailedRole.description || '-'}
                  </Typography>
                </div>
              </div>

              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
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
                  onClick={() => setDetailModalOpen(false)}
                />
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onOk={async () => {
          try {
            if (!toBeDeletedRole) {
              return
            }

            await deleteRole.mutateAsync({
              id: toBeDeletedRole.toString()
            })

            await queryClient.invalidateQueries()
            setDeleteModalOpen(false)

            setAlert({
              title: 'Delete Successful',
              content: 'Your role was success to deleted',
              color: 'success',
              icon: 'ic:baseline-check',
              open: true
            })

            deleteRole.reset()
          } catch {
            setDeleteModalOpen(false)

            setAlert({
              title: 'Delete Failed',
              content: 'Your role was failed to deleted',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              open: true
            })
          }
        }}
        variant='danger'
        loading={deleteRole.isLoading || deleteRole.isSuccess}
        title='Are you sure you want to delete this role?'
      />

      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        variant='warning'
        loading={(createMutation.isLoading || createMutation.isSuccess) && !createMutation.isPaused}
        positiveLabel='Yes'
        title='Are you sure you want to create this role?'
        onOk={onAddSubmitConfirm}
      />

      <Modal
        isOpen={confirmEditModalOpen}
        onClose={() => setConfirmEditModalOpen(false)}
        variant='warning'
        loading={(updateMutation.isLoading || updateMutation.isSuccess) && !updateMutation.isPaused}
        positiveLabel='Yes'
        title='Are you sure you want to edit this role?'
        onOk={onEditSubmitConfirm}
      />
    </main>
  )
}
