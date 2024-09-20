import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import { Input } from 'src/components/atoms/input'
import * as yup from 'yup'
import { Button } from 'src/components/atoms/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import client from 'src/client'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import toast from 'react-hot-toast'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useRef, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useUser } from 'src/hooks/useUser'
import { assetKeys } from 'src/utils/query-keys'
import Avatar from '@mui/material/Avatar'
import axios, { type GenericFormData } from 'axios'

const changeProfileSchema = yup.object().shape({
  first_name: yup.string().required().min(1),
  last_name: yup.string().required().min(1)
})

type ChangeProfileSchema = yup.InferType<typeof changeProfileSchema>

const changePasswordSchema = yup.object().shape({
  password: yup.string().required().min(1),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match')
})

type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const meQuery = useUser()
  const queryClient = useQueryClient()
  const pictureInputRef = useRef<HTMLInputElement>(null)

  const getAssetQuery = useQuery({
    queryKey: assetKeys.detail(meQuery.data?.data?.avatar),
    async queryFn() {
      if (!meQuery.data?.data?.avatar) {
        throw new Error('Invalid asset ID')
      }

      const response = await client.api.get(`/assets/${meQuery.data?.data.avatar}`, {
        responseType: 'blob'
      })

      return new Promise<string>(callback => {
        const reader = new FileReader()
        reader.onload = function () {
          callback(String(reader.result))
        }
        reader.readAsDataURL(response.data)
      })
    },
    enabled: Boolean(meQuery.data?.data?.avatar)
  })

  const changeProfileForm = useForm<ChangeProfileSchema>({
    resolver: yupResolver(changeProfileSchema),
    defaultValues: {
      first_name: meQuery.data?.data?.first_name,
      last_name: meQuery.data?.data?.last_name
    }
  })

  const changeProfileMutation = useMutation({
    mutationFn: async (data: ChangeProfileSchema) => client.api.patch('/users/me', data)
  })

  const onChangeProfileSubmit = (data: ChangeProfileSchema) => {
    changeProfileMutation.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries()
        toast.success('Your profile has been updated', {
          duration: 4000
        })
      },
      onError: () => {
        toast.error('Something went wrong. Please try to save again', {
          duration: 4000
        })
      }
    })
  }

  const changePasswordForm = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema)
  })

  const changePasswordMutation = useMutation({
    mutationFn: async (data: Omit<ChangePasswordSchema, 'confirm_password'>) => client.api.patch('/users/me', data)
  })

  const onChangePasswordSubmit = (data: ChangePasswordSchema) => {
    changePasswordMutation.mutate(
      {
        password: data.password
      },
      {
        onSuccess: async () => {
          toast.success('Your password has been updated', {
            duration: 4000
          })
        },
        onError: () => {
          toast.error('Something went wrong. Please try to save again', {
            duration: 4000
          })
        }
      }
    )
  }

  const uploadPictureMutation = useMutation({
    async mutationFn(data: GenericFormData) {
      type Metadata = {}

      type Data = {
        id: string
        storage: string
        filename_disk: string
        filename_download: string
        title: string
        type: string
        folder: any
        uploaded_by: string
        uploaded_on: string
        modified_by: any
        modified_on: string
        charset: any
        filesize: string
        width: number
        height: number
        duration: any
        embed: any
        description: any
        location: any
        tags: any
        metadata: Metadata
      }

      type UploadFileResponse = {
        data: Data
      }

      const uploadFileResponse = await client.api.post<UploadFileResponse>('/files', data)

      return client.api.patch('/users/me', {
        avatar: uploadFileResponse.data.data.id
      })
    }
  })

  return (
    <>
      <Typography variant='h2'>Settings</Typography>

      <Box sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 1, mt: 4 }}>
        <Box sx={{ py: 3, px: 4 }}>
          <Typography variant='h4'>Picture</Typography>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Avatar
              alt={`${meQuery.data?.data?.first_name} ${meQuery.data?.data?.last_name}`}
              sx={{ width: 120, height: 120, mt: 2 }}
              src={meQuery.data?.data?.avatar ? getAssetQuery.data : undefined}
            />
            <input
              type='file'
              ref={pictureInputRef}
              style={{ display: 'none' }}
              onChange={e => {
                const files = e.currentTarget.files
                if (!files || !files.length) {
                  return
                }

                const formData = axios.toFormData({ file: files[0] })
                uploadPictureMutation.mutate(formData, {
                  async onSuccess() {
                    await queryClient.invalidateQueries()
                    toast.success('Your picture has been updated')
                  }
                })
              }}
            />
            <Button
              variant='contained'
              content='textOnly'
              text='Upload new picture'
              size='medium'
              type='button'
              onClick={() => pictureInputRef.current?.click()}
            />
          </div>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 1, mt: 4 }}>
        <Box sx={{ py: 3 }}>
          <Typography variant='h4' sx={{ mx: 4 }}>
            Profile
          </Typography>
          <Box sx={{ mt: 4 }}>
            <form onSubmit={changeProfileForm.handleSubmit(onChangeProfileSubmit)}>
              <Box sx={{ px: 4 }}>
                <Box>
                  <label htmlFor='email' style={{ display: 'block' }}>
                    Email
                  </label>
                  <Input
                    fullWidth
                    id='email'
                    value={meQuery.data?.data?.email}
                    disabled
                    placeholder='Email'
                    variant='filled'
                    style={{ marginTop: '4px' }}
                  />
                </Box>
                <Box sx={{ mt: 4 }}>
                  <label htmlFor='first_name' style={{ display: 'block' }}>
                    First Name
                  </label>
                  <Controller
                    control={changeProfileForm.control}
                    name='first_name'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        id='first_name'
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='First Name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  {changeProfileForm.formState.errors.first_name && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {changeProfileForm.formState.errors.first_name.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box sx={{ mt: 4 }}>
                  <label htmlFor='last_name' style={{ display: 'block' }}>
                    Last Name
                  </label>
                  <Controller
                    control={changeProfileForm.control}
                    name='last_name'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        id='last_name'
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='Last Name'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                      />
                    )}
                  />
                  {changeProfileForm.formState.errors.last_name && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {changeProfileForm.formState.errors.last_name.message}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4 }}>
                <Button
                  variant='contained'
                  content='textOnly'
                  text='Save'
                  size='medium'
                  type='submit'
                  disabled={changeProfileForm.formState.isSubmitting}
                  loading={changeProfileForm.formState.isSubmitting}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 1, mt: 8 }}>
        <Box sx={{ py: 3 }}>
          <Typography variant='h4' sx={{ mx: 4 }}>
            Change Password
          </Typography>
          <Box sx={{ mt: 4 }}>
            <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)}>
              <Box sx={{ px: 4 }}>
                <Box sx={{ mt: 4 }}>
                  <label htmlFor='password' style={{ display: 'block' }}>
                    Password
                  </label>
                  <Controller
                    control={changePasswordForm.control}
                    name='password'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='Password'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setShowPassword(show => !show)}
                                onMouseDown={event => event.preventDefault()}
                                edge='end'
                              >
                                {showPassword ? <Icon icon='tabler:eye' /> : <Icon icon='tabler:eye-off' />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {changePasswordForm.formState.errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {changePasswordForm.formState.errors.password.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box sx={{ mt: 4 }}>
                  <label htmlFor='confirm_password' style={{ display: 'block' }}>
                    Confirm Password
                  </label>
                  <Controller
                    control={changePasswordForm.control}
                    name='confirm_password'
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirm_password'
                        defaultValue={value}
                        onChange={onChange}
                        placeholder='Confirm Password'
                        variant='filled'
                        style={{ marginTop: '4px' }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setShowConfirmPassword(show => !show)}
                                onMouseDown={event => event.preventDefault()}
                                edge='end'
                              >
                                {showConfirmPassword ? <Icon icon='tabler:eye' /> : <Icon icon='tabler:eye-off' />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  {changePasswordForm.formState.errors.confirm_password && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {changePasswordForm.formState.errors.confirm_password.message}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4 }}>
                <Button
                  variant='contained'
                  content='textOnly'
                  text='Save'
                  size='medium'
                  type='submit'
                  disabled={changePasswordForm.formState.isSubmitting}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}
