import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { type MouseEventHandler, useEffect, useState } from 'react'
import Dropzone, { type FileWithPath } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { Button } from 'src/components/atoms/button'
import { Input } from 'src/components/atoms/input'
import { Textarea } from 'src/components/atoms/textarea'
import * as yup from 'yup'

type Step = {
  title: string
  description: string
}

const steps: Step[] = [
  {
    title: 'Plant Detail',
    description: 'Enter Plant Detail'
  },
  {
    title: 'Contact & Location',
    description: 'Enter Contact & Location'
  },
  {
    title: 'Image Plant',
    description: 'Enter Image Plant'
  },
  {
    title: 'Review Data',
    description: 'Review your data'
  }
]

const schema = yup.object().shape({
  code: yup.string().required().min(1).default(''),
  name: yup.string().required().min(1).default(''),
  description: yup.string().nullable().default(''),
  email: yup.string().email().required().min(1).default(''),
  company_phone: yup.string().required().default(null),
  post_code: yup.string().nullable().default(null),
  longitude: yup.string().nullable().default(null),
  latitude: yup.string().nullable().default(null),
  address: yup.string().nullable().default(null),
  logo: yup.mixed().nullable().default(null),
  picture: yup.mixed().nullable().default(null)
})

type Schema = yup.InferType<typeof schema>

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default function AddPlantPage() {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [paddingTop, setPaddingTop] = useState('0')
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  const router = useRouter()

  const watchLogo = form.watch('logo') as unknown as Blob | null
  const logoPreviewString = watchLogo ? URL.createObjectURL(watchLogo) : null
  useEffect(() => {
    return () => {
      if (logoPreviewString) {
        URL.revokeObjectURL(logoPreviewString)
      }
    }
  }, [logoPreviewString])

  const watchPicture = form.watch('picture') as unknown as Blob | null
  const picturePreviewString = watchPicture ? URL.createObjectURL(watchPicture) : null
  useEffect(() => {
    return () => {
      if (picturePreviewString) {
        URL.revokeObjectURL(picturePreviewString)
      }
    }
  }, [picturePreviewString])

  const watchName = form.watch('name')
  const watchCode = form.watch('code')
  const watchDescription = form.watch('description')
  const watchEmail = form.watch('email')
  const watchAddress = form.watch('address')
  const watchCompanyPhone = form.watch('company_phone')
  const watchPostCode = form.watch('post_code')
  const watchLongitude = form.watch('longitude')
  const watchLatitude = form.watch('latitude')

  const onNextClick: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    let isValid = false

    if (activeStep === 0) {
      isValid = await form.trigger(['code', 'name', 'description'])
    }

    if (activeStep === 1) {
      isValid = await form.trigger(['email', 'company_phone', 'post_code', 'longitude', 'latitude', 'address'])
    }

    if (activeStep === 2) {
      isValid = await form.trigger(['logo', 'picture'])
    }

    if (isValid) {
      setActiveStep(prev => prev + 1)
    }
  }

  function onSubmit(data: Schema) {
    console.log('data', data)
    router.push('/plants')
  }

  function getStepIconAttrs(step: number) {
    if (activeStep === step) {
      return {
        color: '#FDFDFC',
        backgroundColor: theme.palette.primary.main
      }
    }

    if (activeStep > step) {
      return {
        color: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 94, 255, .16)'
      }
    }

    return {
      color: theme.palette.placeholder,
      backgroundColor: theme.palette.grey[200]
    }
  }

  return (
    <>
      <main>
        <Typography variant='h2'>Add Plant</Typography>
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
          <Typography variant='body1' color={`${theme.palette.text.primary} !important`}>
            Add Plant
          </Typography>
        </Breadcrumbs>
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            marginTop: '24.5px',
            boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
            padding: '20px'
          }}
        >
          <CardContent sx={{ padding: 0, flexShrink: 0 }}>
            <Stepper activeStep={activeStep} orientation='vertical' connector={<></>}>
              {steps.map((step, index) => {
                return (
                  <Step key={index} completed={activeStep > index}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-iconContainer': {
                          paddingRight: '12px'
                        }
                      }}
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            backgroundColor: getStepIconAttrs(index).backgroundColor,
                            color: getStepIconAttrs(index).color,
                            p: '9px 13px',
                            fontWeight: '700',
                            borderRadius: '6px'
                          }}
                        >
                          {index + 1}
                        </Box>
                      )}
                    >
                      <Typography
                        variant='body1'
                        sx={{ fontWeight: 500, fontSize: '14px', letterSpacing: '.1px', lineHeight: '21.98px' }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{ fontSize: '12px', letterSpacing: '.4px', lineHeight: '19.9px' }}
                      >
                        {step.description}
                      </Typography>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </CardContent>
          <Divider flexItem orientation='vertical' sx={{ borderColor: theme.palette.grey[200], mx: '24px' }} />
          <CardContent sx={{ width: '100%', padding: 0 }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Typography variant='h6' sx={{ fontWeight: 500, lineHeight: '26px', fontSize: '16px' }} component='h2'>
                {steps[activeStep].title}
              </Typography>

              <Typography
                variant='caption'
                component='p'
                style={{ fontSize: '12px', letterSpacing: '.25px', color: '#485171' }}
              >
                {steps[activeStep].description}
              </Typography>

              {activeStep === 0 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap: '12px',
                    columnGap: '20px',
                    marginTop: '20px'
                  }}
                >
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
                      Plant Code <span style={{ color: theme.palette.error.main }}>*</span>
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
                          color={fieldState.invalid ? 'error' : 'primary'}
                          placeholder='Plant Code'
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
                      Plant Name <span style={{ color: theme.palette.error.main }}>*</span>
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
                          variant='filled'
                          color={fieldState.invalid ? 'error' : 'primary'}
                          placeholder='Plant Name'
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
                    {form.formState.errors.description ? (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {form.formState.errors.description.message}
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {activeStep === 1 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap: '12px',
                    columnGap: '20px',
                    marginTop: '20px'
                  }}
                >
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
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {form.formState.errors.email.message}
                      </FormHelperText>
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
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {form.formState.errors.latitude.message}
                      </FormHelperText>
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
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {form.formState.errors.address.message}
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {activeStep === 2 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap: '12px',
                    columnGap: '20px',
                    marginTop: '20px'
                  }}
                >
                  <div>
                    <Controller
                      control={form.control}
                      name='logo'
                      render={({ field: { onChange, onBlur }, fieldState }) => (
                        <>
                          <Dropzone
                            onDrop={(acceptedFiles: FileWithPath[]) => {
                              onChange(acceptedFiles[0])
                            }}
                            multiple={false}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <>
                                <label
                                  htmlFor='logo'
                                  style={{
                                    display: 'inline-block',
                                    color: theme.palette.text.secondary,
                                    fontSize: '14px',
                                    letterSpacing: '.25px'
                                  }}
                                >
                                  Logo
                                </label>
                                <div
                                  {...getRootProps()}
                                  style={{
                                    borderRadius: '8px',
                                    border: '1px dashed #005EFF',
                                    backgroundColor: '#F7F8FA',
                                    textAlign: 'center',
                                    height: '237px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    marginTop: '4px'
                                  }}
                                >
                                  <div>
                                    <p style={{ color: '#2F3033', fontWeight: '500', fontSize: '14px', margin: 0 }}>
                                      Choose a file or drag it here
                                    </p>
                                    <div
                                      style={{
                                        backgroundColor: '#D5D7DA',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        marginTop: '12px'
                                      }}
                                    >
                                      <Icon fontSize='28px' icon='mdi:tray-arrow-up' color='#2F3033' />
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      position: 'absolute',
                                      bottom: '16px',
                                      left: 0,
                                      right: 0
                                    }}
                                  >
                                    <div style={{ flexBasis: '50%' }}>
                                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                        Maximum file size :{' '}
                                        <span style={{ fontWeight: 700, color: '#2F3033' }}>10 Mb</span>
                                      </p>
                                    </div>
                                    <div style={{ flexBasis: '50%' }}>
                                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                        Format : <span style={{ fontWeight: 700, color: '#2F3033' }}>JPG, PNG</span>
                                      </p>
                                    </div>
                                  </div>
                                  <input
                                    id='logo'
                                    {...getInputProps({
                                      onChange,
                                      onBlur
                                    })}
                                  />
                                </div>

                                {fieldState.error ? (
                                  <FormHelperText sx={{ color: 'error.main' }}>
                                    {fieldState.error?.message}
                                  </FormHelperText>
                                ) : null}
                              </>
                            )}
                          </Dropzone>
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      control={form.control}
                      name='picture'
                      render={({ field: { onChange, onBlur }, fieldState }) => (
                        <>
                          <Dropzone
                            onDrop={(acceptedFiles: FileWithPath[]) => {
                              onChange(acceptedFiles[0])
                            }}
                            multiple={false}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <>
                                <label
                                  htmlFor='picture'
                                  style={{
                                    display: 'inline-block',
                                    color: theme.palette.text.secondary,
                                    fontSize: '14px',
                                    letterSpacing: '.25px'
                                  }}
                                >
                                  Picture
                                </label>

                                <div
                                  {...getRootProps()}
                                  style={{
                                    borderRadius: '8px',
                                    border: '1px dashed #005EFF',
                                    backgroundColor: '#F7F8FA',
                                    textAlign: 'center',
                                    height: '237px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    marginTop: '4px'
                                  }}
                                >
                                  <div>
                                    <p style={{ color: '#2F3033', fontWeight: '500', fontSize: '14px', margin: 0 }}>
                                      Choose a file or drag it here
                                    </p>
                                    <div
                                      style={{
                                        backgroundColor: '#D5D7DA',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        marginTop: '12px'
                                      }}
                                    >
                                      <Icon fontSize='28px' icon='mdi:tray-arrow-up' color='#2F3033' />
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      position: 'absolute',
                                      bottom: '16px',
                                      left: 0,
                                      right: 0
                                    }}
                                  >
                                    <div style={{ flexBasis: '50%' }}>
                                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                        Maximum file size :{' '}
                                        <span style={{ fontWeight: 700, color: '#2F3033' }}>50 Mb</span>
                                      </p>
                                    </div>
                                    <div style={{ flexBasis: '50%' }}>
                                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                        Format : <span style={{ fontWeight: 700, color: '#2F3033' }}>JPG, PNG</span>
                                      </p>
                                    </div>
                                  </div>
                                  <input
                                    id='picture'
                                    {...getInputProps({
                                      onChange,
                                      onBlur
                                    })}
                                  />
                                </div>

                                {fieldState.error ? (
                                  <FormHelperText sx={{ color: 'error.main' }}>
                                    {fieldState.error?.message}
                                  </FormHelperText>
                                ) : null}
                              </>
                            )}
                          </Dropzone>
                        </>
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {activeStep === 3 ? (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', marginTop: '20px' }}>
                  <div
                    style={{
                      border: `1px solid ${theme.palette.grey[300]}`,
                      borderRadius: '6px',
                      padding: '20px',
                      display: 'flex',
                      columnGap: '16px',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '88px',
                        height: '88px',
                        position: 'relative',
                        ...(logoPreviewString
                          ? {}
                          : {
                              backgroundColor: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            })
                      }}
                    >
                      {logoPreviewString ? (
                        <Image
                          src={logoPreviewString}
                          alt='Uploaded logo preview'
                          onLoad={() => URL.revokeObjectURL(logoPreviewString)}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <Icon icon='mdi:account-outline' color='#005EFF' fontSize='48px' />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
                      <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                        {watchName}
                      </Typography>
                      <Typography
                        variant='labelMd'
                        component='p'
                        style={{ color: theme.palette.text.disabled, lineHeight: 'normal' }}
                      >
                        {watchEmail}
                      </Typography>
                      <Typography
                        variant='labelSm'
                        component='p'
                        style={{ color: theme.palette.text.disabled, lineHeight: 'normal' }}
                      >
                        {watchAddress}
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#FEFEFE',
                      border: `1px solid ${theme.palette.grey[300]}`,
                      borderRadius: '6px',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                      <div style={{ flexBasis: '100%' }}>
                        <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                          Plant Detail
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Plant Name :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchName}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Plant Code :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchCode}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
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
                          {watchDescription}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#FEFEFE',
                      border: `1px solid ${theme.palette.grey[300]}`,
                      borderRadius: '6px',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                      <div style={{ flexBasis: '100%' }}>
                        <Typography variant='h5' component='h2' style={{ fontSize: '18px' }}>
                          Contact & Location
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '100%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Email :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchEmail || '-'}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Company Phone Number :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchCompanyPhone || '-'}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Postal Code :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchPostCode || '-'}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Longitude :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchLongitude || '-'}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Latitude :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchLatitude || '-'}
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '100%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Address :
                        </Typography>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.secondary, marginTop: '5px' }}
                        >
                          {watchAddress || '-'}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#FEFEFE',
                      border: `1px solid ${theme.palette.grey[300]}`,
                      borderRadius: '6px',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
                      <div style={{ flexBasis: '100%' }}>
                        <Typography variant='h5' component='h2'>
                          Image Plant
                        </Typography>
                      </div>
                      <div style={{ flexBasis: '50%' }}>
                        <Typography
                          variant='body1'
                          component='p'
                          style={{ fontSize: '13px', color: theme.palette.text.disabled }}
                        >
                          Picture :
                        </Typography>
                        <button
                          type='button'
                          style={{
                            marginTop: '5px',
                            backgroundColor: theme.palette.grey[100],
                            borderRadius: '6px',
                            padding: '10px',
                            display: 'flex',
                            columnGap: '20px',
                            alignItems: 'center',
                            border: 0,
                            width: '100%',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                          onClick={() => setImageModalOpen(true)}
                        >
                          <div
                            style={{
                              width: '71px',
                              height: '71px',
                              position: 'relative',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              ...(picturePreviewString
                                ? {}
                                : {
                                    backgroundColor: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  })
                            }}
                          >
                            {picturePreviewString ? (
                              <Image
                                src={picturePreviewString}
                                alt='Uploaded logo preview'
                                onLoad={() => URL.revokeObjectURL(picturePreviewString)}
                                fill
                                style={{ objectFit: 'cover' }}
                              />
                            ) : (
                              <Icon icon='mdi:account-outline' color='#005EFF' fontSize='48px' />
                            )}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '7px' }}>
                            <Typography
                              variant='PlaceholderSm'
                              component='p'
                              style={{ color: theme.palette.text.secondary }}
                            >
                              {watchPicture?.name}
                            </Typography>

                            {watchPicture?.size ? (
                              <Typography
                                variant='PlaceholderSm'
                                component='p'
                                style={{ color: theme.palette.text.disabled }}
                              >
                                {formatBytes(watchPicture.size)}
                              </Typography>
                            ) : null}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant='outlined'
                  color='primary'
                  content='iconText'
                  text={activeStep === 0 ? 'Cancel' : 'Back'}
                  icon={activeStep !== 0 ? 'material-symbols:chevron-left' : ''}
                  size='large'
                  sx={{
                    height: '44px',
                    padding: '12.5px 20px !important',
                    borderRadius: '4px',
                    fontSize: '16px',
                    border: `1.5px solid ${theme.palette.primary.main}`
                  }}
                  type='button'
                  {...(activeStep === 0
                    ? {
                        LinkComponent: NextLink,
                        href: '/plants'
                      }
                    : {})}
                />
                <Button
                  variant='contained'
                  content='iconText'
                  text={activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  icon={activeStep === steps.length - 1 ? '' : 'material-symbols:chevron-right'}
                  size='large'
                  sx={{ height: '44px', padding: '12.5px 20px !important', borderRadius: '4px', fontSize: '16px' }}
                  {...(activeStep === steps.length - 1 ? { type: 'submit' } : { type: 'button', onClick: onNextClick })}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Dialog
        fullWidth
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            borderRadius: 0
          }
        }}
        maxWidth='md'
      >
        {watchPicture && picturePreviewString ? (
          <>
            <DialogContent sx={{ padding: '0 !important' }}>
              <div style={{ position: 'relative', paddingTop }}>
                <Image
                  src={picturePreviewString}
                  alt={watchPicture?.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  onLoadingComplete={img => {
                    setPaddingTop(`calc(100% / (${img.naturalWidth} / ${img.naturalHeight}))`)
                  }}
                />
              </div>
            </DialogContent>

            <Button
              type='button'
              content='iconOnly'
              icon='material-symbols:close'
              style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={() => setImageModalOpen(false)}
            />
          </>
        ) : null}
      </Dialog>
    </>
  )
}
