// ** React Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** React Hook Form & Validation
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** State Management
import { useAtom } from 'jotai'
import { loadingAtom } from 'src/atoms'

// ** Custom Components
import { Input } from 'src/components/atoms/input'
import { Field } from '@/components/molecules/field'
import { Button } from '@/components/atoms'

// ** Configs
import authConfig from 'src/configs/auth'

// ** Validation Schemas
import { ChangePasswordSchema, Schema } from '../types/Login.type'
import { changePasswordSchema, schema } from '../validations'

// ** Services
import { useResetPasswordMutation } from '../services/actionPostLogin.service'


const FormResetPassword = ({ loginResponseData, userId, setOpen }: { loginResponseData: any, userId: string, setOpen: any }) => {
  const router = useRouter()
  const [, setLoading] = useAtom(loadingAtom)

  // ** Hooks
  const theme = useTheme()

  // ** Services
  const resetPasswordMutation = useResetPasswordMutation()

  const changePasswordForm = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: changePasswordSchema.getDefault()
  })

  const onResetPassword = async (data: any) => {
    try {
      if (!userId || !loginResponseData) {
        return
      }

      await resetPasswordMutation.mutateAsync({
        id: userId,
        password: data.password,
        access_token: loginResponseData.data.access_token
      })

      localStorage.setItem(authConfig.accessTokenKeyName, loginResponseData.data.access_token)
      localStorage.setItem(authConfig.refreshTokenKeyName, loginResponseData.data.refresh_token)

      setLoading(true)

      router.push('/')
    } catch { }

  }

  return (
    <Box
      width='100%'
      component='form'
      onSubmit={changePasswordForm.handleSubmit(onResetPassword)}
    >
      <Box display='flex' flexDirection='column' rowGap='16px' marginTop='26px'>
        <Controller
          name='password'
          control={changePasswordForm.control}
          render={({
            field: {
              name,
              ...rest
            },
            fieldState
          }) => {
            return (
              <Field
                size="large"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='codicon:mail' fontSize={20} />
                    </InputAdornment>
                  )
                }}
                weight="bolder" sx={{ my: 2 }}
                placeholder=''
                fullWidth label='New Password'
                isRequired
                error={fieldState.invalid}
                helperText={changePasswordForm.formState.errors && changePasswordForm.formState.errors[name]?.message} {...rest}
              >
                <Input
                  placeholder='Input New Password'
                  type='text'
                  variant='outlined'
                />
              </Field>
            );
          }}
        />
        <Controller
          name='confirmPassword'
          control={changePasswordForm.control}
          render={({
            field: {
              name,
              ...rest
            },
            fieldState
          }) => {
            return (
              <Field
                size="large"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='codicon:mail' fontSize={20} />
                    </InputAdornment>
                  )
                }}
                weight="bolder" sx={{ my: 2 }}
                fullWidth
                label='New Password'
                placeholder='Input Confirm New Password'
                isRequired
                error={fieldState.invalid}
                helperText={changePasswordForm.formState.errors && changePasswordForm.formState.errors[name]?.message} {...rest}
              >
                <Input
                  type='text' variant='outlined' />
              </Field>
            );
          }}
        />
      </Box>

      <Box marginTop='31px' display='flex' alignItems='center' justifyContent='end' columnGap='16px'>
        <Button
          color='secondary'
          variant='outlined'
          sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
          type='button'
          onClick={() => setOpen(false)}
          disabled={changePasswordForm.formState.isSubmitting || changePasswordForm.formState.isSubmitSuccessful}
          content='textOnly'
          text='Cancel'
        />

        <Button
          variant='contained'
          sx={{ height: '35px', borderRadius: '4px', padding: '0 16px', fontWeight: 500, fontSize: '16px' }}
          type='submit'
          disabled={changePasswordForm.formState.isSubmitting || changePasswordForm.formState.isSubmitSuccessful}
          content='textOnly'
          text='Submit'
          loading={changePasswordForm.formState.isSubmitting || changePasswordForm.formState.isSubmitSuccessful}
        />
      </Box>
    </Box>
  )
}

export default FormResetPassword
