import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { useTheme } from '@mui/material/styles'
import Link from '@mui/material/Link'
import Icon from 'src/@core/components/icon'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import { Input } from 'src/components/atoms/input'
import { Textarea } from 'src/components/atoms/textarea'
import { Button } from 'src/components/atoms/button'

const schema = yup.object().shape({
  email: yup.string().email().required().min(1).default(''),
  company_phone: yup.string().required().default(null),
  post_code: yup.string().nullable().default(null),
  longitude: yup.string().nullable().default(null),
  latitude: yup.string().nullable().default(null),
  address: yup.string().nullable().default(null)
})

type Schema = yup.InferType<typeof schema>

export default function ManagePlantsEditContactAndLocationPage() {
  const theme = useTheme()
  const router = useRouter()
  const form = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  function onSubmit() {
    console.log('submitted')
    router.push(`/plants/${router.query.id}/edit`)
  }

  return (
    <main>
      <Typography variant='h2'>Edit Contact & Location</Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{ mt: '8px' }}
        separator={<Icon icon='mdi:chevron-right' color='#909094' />}
      >
        <Link component={NextLink} href='/'>
          <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
        </Link>
        <Link component={NextLink} href='/plants'>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Manage Plant
          </Typography>
        </Link>
        <Link component={NextLink} href={`/plants/${router.query.id}/edit`}>
          <Typography variant='body1' color={`${theme.palette.primary.main} !important`}>
            Edit Plant
          </Typography>
        </Link>
        <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
          Edit Contact & Location
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
        <CardContent style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: 0 }}>
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
                  Contact & Location Form
                </Typography>

                <Typography
                  variant='caption'
                  component='p'
                  style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
                >
                  Complete the data to edit Contact & Location
                </Typography>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label
                  htmlFor='email'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Email <span style={{ color: theme.palette.error.main }}>*</span>
                </label>
                <Controller
                  control={form.control}
                  name='email'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='email'
                      variant='filled'
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Email'
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
                {form.formState.errors.email ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.email.message}</FormHelperText>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='company_phone'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Company Phone Number <span style={{ color: theme.palette.error.main }}>*</span>
                </label>
                <Controller
                  control={form.control}
                  name='company_phone'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='company_phone'
                      variant='filled'
                      placeholder='Company Phone Number'
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
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
                {form.formState.errors.company_phone ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {form.formState.errors.company_phone.message}
                  </FormHelperText>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='post_code'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Postal Code
                </label>
                <Controller
                  control={form.control}
                  name='post_code'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='post_code'
                      variant='filled'
                      placeholder='Postal Code'
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
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
                {form.formState.errors.post_code ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {form.formState.errors.post_code.message}
                  </FormHelperText>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='longitude'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Longitude
                </label>
                <Controller
                  control={form.control}
                  name='longitude'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='longitude'
                      variant='filled'
                      placeholder='Longitude'
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
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
                {form.formState.errors.longitude ? (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {form.formState.errors.longitude.message}
                  </FormHelperText>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor='latitude'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Latitude
                </label>
                <Controller
                  control={form.control}
                  name='latitude'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Input
                      fullWidth
                      type='text'
                      id='latitude'
                      variant='filled'
                      placeholder='Latitude'
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
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
                {form.formState.errors.latitude ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.latitude.message}</FormHelperText>
                ) : null}
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label
                  htmlFor='address'
                  style={{
                    display: 'inline-block',
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    letterSpacing: '.25px'
                  }}
                >
                  Address
                </label>
                <Controller
                  control={form.control}
                  name='address'
                  defaultValue=''
                  render={({ field: { ref, ...rest }, fieldState }) => (
                    <Textarea
                      id='address'
                      fullWidth
                      inputRef={ref}
                      color={fieldState.invalid ? 'error' : 'primary'}
                      placeholder='Address'
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
                {form.formState.errors.address ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.address.message}</FormHelperText>
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
                href={`/plants/${router.query.id}/edit`}
              />
              <Button
                variant='contained'
                content='textOnly'
                text='Save'
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
