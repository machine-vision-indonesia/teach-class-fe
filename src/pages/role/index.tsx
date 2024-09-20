import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import { Button } from 'src/components/atoms/button'
import { useTheme } from '@mui/material/styles'
import { Input } from 'src/components/atoms/input'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Textarea } from 'src/components/atoms/textarea'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'

type User = {
  id: string
  name: string
}

type Department = {
  name: string
}

type Role = {
  id: string
  code: string | null
  name: string
  parent: Pick<Role, 'name'> | null
  users: User[]
  department: Department
}

const roles: Role[] = [
  {
    id: '1',
    code: 'ROLE_1',
    name: 'Role 1',
    parent: null,
    users: [
      {
        id: '1',
        name: 'User 1'
      },
      {
        id: '2',
        name: 'User 2'
      }
    ],
    department: {
      name: 'Department 1'
    }
  },
  {
    id: '2',
    code: 'ROLE_2',
    name: 'Role 2',
    parent: {
      name: 'Role 1'
    },
    users: [
      {
        id: '3',
        name: 'User 4'
      },
      {
        id: '4',
        name: 'User 4'
      }
    ],
    department: {
      name: 'Department 1'
    }
  }
]

const roleOptions = roles.map(role => ({
  id: role.id,
  label: role.name
}))

const schema = yup.object().shape({
  code: yup.string().required().min(1),
  name: yup.string().required().min(1),
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

export default function ManageRolePage() {
  const theme = useTheme()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

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

  function onAddSubmit(data: Schema) {
    console.log('data', data)
    setAddModalOpen(false)
  }

  function onEditSubmit(data: Schema) {
    console.log('data', data)
    setAddModalOpen(false)
  }

  return (
    <main>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <Button
          variant='contained'
          size='large'
          content='iconText'
          text='Add Role'
          icon='mdi:plus'
          sx={{ height: '43px', padding: '8px 16px !important', borderRadius: '4px', fontSize: '1rem' }}
          onClick={() => setAddModalOpen(true)}
        />
      </div>

      <div
        style={{
          backgroundColor: '#FEFEFE',
          borderRadius: '6px',
          boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
          marginTop: '24.5px'
        }}
      >
        <div style={{ padding: '10px 20px' }}>
          <Input
            placeholder='Search'
            variant='filled'
            fullWidth
            sx={{
              '& fieldset': { border: 'none' },
              '& .MuiOutlinedInput-root.Mui-focused': {
                boxShadow: 'none'
              }
            }}
            InputProps={{
              style: {
                paddingLeft: '0px'
              },
              startAdornment: (
                <Icon fontSize='24px' icon='mdi:magnify' color='#6C7086' style={{ marginRight: '10px' }} />
              )
            }}
          />
        </div>
        <Divider sx={{ borderColor: theme.palette.grey[200] }} />
        <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <Autocomplete
            sx={{ width: 130 }}
            options={roleOptions}
            autoHighlight
            getOptionLabel={option => option.label}
            renderOption={(props, option) => (
              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <Checkbox />
                {option.label}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label='Parent'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
                sx={{
                  '& fieldset': { border: 'none' },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    boxShadow: 'none'
                  }
                }}
              />
            )}
          />
        </div>
        <Divider sx={{ borderColor: theme.palette.grey[200] }} />
        <div style={{ padding: '24px 20px 25.5px' }}>
          <Typography variant='body1' sx={{ fontSize: '13px' }}>
            No Filter
          </Typography>
        </div>
        <Divider sx={{ borderColor: theme.palette.grey[200] }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#F5F8FF' }}>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Parent</TableCell>
                <TableCell>Jumlah User</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{role.code}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.parent?.name}</TableCell>
                  <TableCell>
                    <Link component={NextLink} href={`/role/${role.id}/users`}>
                      {role.users.length} users
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                      <Button
                        style={{ padding: 0, minWidth: 'auto', color: theme.palette.brand.second }}
                        type='button'
                        content='iconOnly'
                        icon='mdi:pencil-outline'
                        onClick={() => setEditModalOpen(true)}
                      />
                      <Button
                        style={{ padding: 0, minWidth: 'auto', color: theme.palette.primary.main }}
                        type='button'
                        content='iconOnly'
                        icon='mdi:eye-outline'
                        onClick={() => setDetailModalOpen(true)}
                      />
                      <Button
                        style={{ padding: 0, minWidth: 'auto', color: theme.palette.error.main }}
                        type='button'
                        content='iconOnly'
                        icon='mdi:delete-outline'
                        onClick={() => setDeleteModalOpen(true)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
              <IconButton onClick={() => setAddModalOpen(false)} style={{ padding: '6px' }}>
                <Icon icon='mdi:close' color={theme.palette.secondary.main} />
              </IconButton>
            </div>
          </div>
          <form onSubmit={addForm.handleSubmit(onAddSubmit)} style={{ padding: '20px 24px' }}>
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
                    <Autocomplete<(typeof roleOptions)[number]>
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
              <IconButton onClick={() => setEditModalOpen(false)} style={{ padding: '6px' }}>
                <Icon icon='mdi:close' color={theme.palette.secondary.main} />
              </IconButton>
            </div>
          </div>
          <form onSubmit={editForm.handleSubmit(onEditSubmit)} style={{ padding: '20px 24px' }}>
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
                    <Autocomplete<(typeof roleOptions)[number]>
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

      <Dialog
        fullWidth
        open={detailModalOpen}
        scroll='body'
        onClose={() => setDetailModalOpen(false)}
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
                  Role Code
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
                  Role Name
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
                  Parent
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
                  2 users
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
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
      </Dialog>

      <Dialog
        fullWidth
        open={deleteModalOpen}
        maxWidth='xs'
        scroll='body'
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{
          style: {
            maxWidth: '512px'
          }
        }}
      >
        <DialogContent
          sx={{
            position: 'relative',
            paddingTop: '43px 0 42px 0 !important'
          }}
        >
          <IconButton
            size='small'
            onClick={() => setDeleteModalOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>

          <div style={{ textAlign: 'center' }}>
            <Icon icon='mdi:cancel-circle-outline' fontSize='80px' color={theme.palette.error[200]} />
            <Typography variant='h4' sx={{ mt: 3 }}>
              Are you sure?
            </Typography>
            <Typography variant='labelMd' sx={{ mt: 1, display: 'block' }}>
              You won’t be able to revert this!
            </Typography>
            <DialogActions
              sx={{
                justifyContent: 'center',
                mt: '31px'
              }}
            >
              <Button
                variant='outlined'
                content='textOnly'
                text='Cancel'
                color='secondary'
                size='medium'
                onClick={() => setDeleteModalOpen(false)}
              />
              <Button variant='contained' content='textOnly' text='Yes, delete it' color='error' size='medium' />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
