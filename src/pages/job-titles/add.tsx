import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import { Input } from 'src/components/atoms/input'
import { Textarea } from 'src/components/atoms/textarea'
import { Radio } from 'src/components/atoms/radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Button } from 'src/components/atoms/button'

const schema = yup.object().shape({
  plant: yup
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
  code: yup.string().required().min(1).default(''),
  name: yup.string().required().min(1).default(''),
  description: yup.string(),
  choose_role: yup
    .string()
    .required()
    .oneOf(['existing-role', 'create-role'] as const)
    .default('existing-role'),
  role: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .when('choose_role', {
      is: 'existing-role',
      then: schema => schema.required()
    })
    .default(null),
  role_code: yup
    .string()
    .when('choose_role', {
      is: 'create-role',
      then: schema => schema.required().min(1)
    })
    .default(''),
  role_name: yup
    .string()
    .when('choose_role', {
      is: 'create-role',
      then: schema => schema.required().min(1)
    })
    .default(null),
  role_parent: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required()
    })
    .when('choose_role', {
      is: 'create-role',
      then: schema => schema.required()
    })
    .default(null),
  role_description: yup.string()
})

type Schema = yup.InferType<typeof schema>

type Plant = {
  id: string
  name: string
}

const plants: Plant[] = [
  {
    id: '1',
    name: 'Plant 1'
  },
  {
    id: '2',
    name: 'Plant 2'
  }
]

const plantOptions = plants.map(plant => ({
  id: plant.id,
  label: plant.name
}))

type Department = {
  id: string
  name: string
}

const departments: Department[] = [
  {
    id: '1',
    name: 'Department 1'
  },
  {
    id: '2',
    name: 'Department 2'
  }
]

const departmentOptions = departments.map(department => ({
  id: department.id,
  label: department.name
}))

type Role = {
  id: string
  name: string
}

const roles: Role[] = [
  {
    id: '1',
    name: 'Role 1'
  },
  {
    id: '2',
    name: 'Role 2'
  }
]

const roleOptions = roles.map(role => ({
  id: role.id,
  label: role.name
}))

export default function JobTitlesAddPage() {
  const theme = useTheme()
  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      choose_role: 'existing-role'
    }
  })

  const watchChooseRole = form.watch('choose_role')

  function onSubmit() {
    console.log('submitted')
  }

  return (
    <main>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant='h2'>Add Job Title</Typography>
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{ mt: '8px' }}
            separator={<Icon icon='mdi:chevron-right' color='#909094' />}
          >
            <Link component={NextLink} href='/'>
              <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
            </Link>
            <Link component={NextLink} href='/job-titles'>
              <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
                Job Title
              </Typography>
            </Link>
            <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
              Add Job Title
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
                <Typography variant='h6' sx={{ fontWeight: 500, lineHeight: '26px', fontSize: '16px' }} component='h2'>
                  Job Title Form
                </Typography>

                <Typography
                  variant='caption'
                  component='p'
                  style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
                >
                  Complete the data to add a Job Title
                </Typography>
              </div>

              <div>
                <label
                  htmlFor='plant'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Plant <span style={{ color: theme.palette.error.main }}>*</span>
                </label>

                <Controller
                  control={form.control}
                  name='plant'
                  render={({ field: { value, onChange, ...rest }, fieldState }) => (
                    <Autocomplete<(typeof plantOptions)[number]>
                      options={plantOptions}
                      size='small'
                      id='plant'
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
                            placeholder='Select Plant'
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

                {form.formState.errors.plant ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.plant.message}</FormHelperText>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='department'
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
                    <Autocomplete<(typeof departmentOptions)[number]>
                      options={departmentOptions}
                      size='small'
                      id='department'
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

                {form.formState.errors.department ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {form.formState.errors.department.message}
                  </FormHelperText>
                ) : null}
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
                  Job Title Code <span style={{ color: theme.palette.error.main }}>*</span>
                </label>
                <Controller
                  control={form.control}
                  name='code'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='code'
                      inputRef={ref}
                      variant='filled'
                      placeholder='Job Title Code'
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
                  Job Title Name <span style={{ color: theme.palette.error.main }}>*</span>
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
                      placeholder='Job Title Name'
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
                      placeholder='Description'
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

              <Controller
                control={form.control}
                name='choose_role'
                render={({ field: { onChange, ...rest } }) => (
                  <RadioGroup
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gridColumn: 'span 2',
                      columnGap: '20px'
                    }}
                    onChange={(_, value) => onChange(value)}
                    {...rest}
                  >
                    <FormControlLabel value='existing-role' control={<Radio />} label='Use Existing Role' />
                    <FormControlLabel value='create-role' control={<Radio />} label='Create Role' />
                  </RadioGroup>
                )}
              />

              <div
                style={{
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: '6px',
                  padding: '20px',
                  gridColumn: 'span 2'
                }}
              >
                {watchChooseRole === 'existing-role' ? (
                  <>
                    <label
                      htmlFor='role'
                      style={{
                        display: 'inline-block',
                        color: theme.palette.text.secondary,
                        fontSize: '14px',
                        letterSpacing: '.25px'
                      }}
                    >
                      Select Role <span style={{ color: theme.palette.error.main }}>*</span>
                    </label>

                    <Controller
                      control={form.control}
                      name='role'
                      render={({ field: { value, onChange, ...rest }, fieldState }) => (
                        <Autocomplete<(typeof roleOptions)[number]>
                          options={roleOptions}
                          size='small'
                          id='role'
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
                                placeholder='Select Role'
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

                    {form.formState.errors.role ? (
                      <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.role.message}</FormHelperText>
                    ) : null}
                  </>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      rowGap: '15px',
                      columnGap: '20px'
                    }}
                  >
                    <div>
                      <label
                        htmlFor='role_code'
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
                        control={form.control}
                        name='role_code'
                        defaultValue=''
                        render={({ field: { ref, ...rest }, fieldState }) => (
                          <Input
                            fullWidth
                            type='text'
                            id='role_code'
                            inputRef={ref}
                            variant='filled'
                            placeholder='Role Code'
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
                      {form.formState.errors.role_code ? (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {form.formState.errors.role_code.message}
                        </FormHelperText>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor='role_name'
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
                        control={form.control}
                        name='role_name'
                        defaultValue=''
                        render={({ field: { ref, ...rest }, fieldState }) => (
                          <Input
                            fullWidth
                            type='text'
                            id='role_name'
                            inputRef={ref}
                            variant='filled'
                            placeholder='Role Name'
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
                      {form.formState.errors.role_name ? (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {form.formState.errors.role_name.message}
                        </FormHelperText>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor='role'
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
                        control={form.control}
                        name='role'
                        render={({ field: { value, onChange, ...rest }, fieldState }) => (
                          <Autocomplete<(typeof roleOptions)[number]>
                            options={roleOptions}
                            size='small'
                            id='role'
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

                      {form.formState.errors.role ? (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {form.formState.errors.role.message}
                        </FormHelperText>
                      ) : null}
                    </div>

                    <div style={{ gridColumn: 'span 3' }}>
                      <label
                        htmlFor='role_description'
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
                        name='role_description'
                        defaultValue=''
                        render={({ field: { ref, ...rest }, fieldState }) => (
                          <Textarea
                            id='role_description'
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

                      {form.formState.errors.role_description ? (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {form.formState.errors.role_description.message}
                        </FormHelperText>
                      ) : null}
                    </div>
                  </div>
                )}
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
                href='/job-titles'
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
  )
}
