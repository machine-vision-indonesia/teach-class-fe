// ** React Imports
import { Dispatch, SetStateAction, useState } from 'react'

// ** Form Handling & Validation
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Utility & Helpers
import { isAxiosError } from 'axios'
import { useRouter } from 'next/router'

// ** Config & Types
import authConfig from 'src/configs/auth'
import { LoginErrorResponse, LoginSuccessResponse, Schema } from '../types/Login.type'
import { schema } from '../validations'

// ** Services & API Calls
import { useLoginMutation, useTfaGenerateMutation } from '../services/actionPostLogin.service'
import { getErrorMessage } from '../utils'
import { EMPETYPREVILEGEMESSAGE } from '../constants/Login.contants'
import { fetchGlobalUser, fetchListUser, fetchUserMe } from '../services/fetchGetLogin.service'

// ** Custom Components
import { Field } from '@/components/molecules/field'
import { Input } from 'src/components/atoms/input'
import { Button } from '@/components/atoms'
import { Modal } from '@/components/molecules'


// ** Additional Components
import ModalVerificationOtp from '@/components/molecules/modal-verification-otp/components/ModalVerificationOtp'
import FormResetPassword from './FormResetPassword'

const FormLogin = ({ setErrorMessage }: { setErrorMessage: Dispatch<SetStateAction<string | undefined>> }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [scanQRCode, setScanQRCode] = useState(false)
  const [isAccountVerified, setIsAccountVerified] = useState(false)

  const [secret, setSecret] = useState('')
  const [otpUrl, setOtpUrl] = useState('')
  const [token, setToken] = useState('')

  // ** Services
  const loginMutation = useLoginMutation()
  const tfaGenerateMutation = useTfaGenerateMutation()

  const formLogin = useForm<Schema>({
    resolver: yupResolver(schema)
  })


  const [loginResponseData, setLoginResponseData] = useState<LoginSuccessResponse>()
  const [userId, setUserId] = useState<string>()

  const onSubmit = async (data: Schema) => {
    try {
      const responseData = await loginMutation.mutateAsync(data)
      setLoginResponseData(responseData.data)
      const response = await fetchListUser({
        email: data.email,
        access_token: responseData.data.data.access_token
      })

      if (response.data[0].is_using_generated_password) {
        setUserId(response.data[0].id)
        setOpen(true)
        formLogin.setError('root', {
          type: 'auth',
          message: 'You are using a generated password. Please change your password.'
        })

        return
      }

      localStorage.setItem('tfa_token', responseData.data.data.access_token)
      setToken(responseData.data.data.access_token)

      const responseGlobalConfig = await fetchGlobalUser()

      if (responseGlobalConfig.data.sign_in_method === 'OTP') {
        //login otp

        // check if have TFA
        const responseUser = await fetchUserMe({
          password: formLogin.getValues('password'),
          access_token: responseData.data.data.access_token
        })

        if (responseUser.data.tfa_secret === null) {
          const payloadData = {
            email: data.email,
            password: data.password,
            token: responseData.data.data.access_token
          }
          const responseTFAGenerate = await tfaGenerateMutation.mutateAsync(payloadData)
          setOtpUrl(responseTFAGenerate.data.data.otpauth_url)
          setSecret(responseTFAGenerate.data.data.secret)
          setIsAccountVerified(false)
          setScanQRCode(true)
        } else {
          setScanQRCode(true)
          setIsAccountVerified(true)
        }
      } else {
        localStorage.setItem(authConfig.accessTokenKeyName, responseData.data.data.access_token)
        localStorage.setItem(authConfig.refreshTokenKeyName, responseData.data.data.refresh_token)
        router.push('/')

      }
    } catch (err) {

      let errMessage = ''
      if (isAxiosError<LoginErrorResponse>(err) && err.response?.data.errors[0].extensions.code === 'INVALID_OTP') {
        setScanQRCode(true)
        setIsAccountVerified(true)
      }

      if (
        isAxiosError<LoginErrorResponse>(err) &&
        err.response?.data.errors[0].extensions.code === 'INVALID_CREDENTIALS'
      ) {
        errMessage = 'Incorrect email or password.'
      } else if (getErrorMessage(err) === EMPETYPREVILEGEMESSAGE) {
        errMessage = EMPETYPREVILEGEMESSAGE
      } else {
        errMessage = 'Something went wrong. Please try again.'
      }

      setErrorMessage(errMessage)
      formLogin.setError('root', {
        type: 'server',
        message: errMessage
      })
    }
  }

  return (
    <>
      <form onSubmit={formLogin.handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={formLogin.control}
          render={({
            field: {
              name,
              ...rest
            },
            fieldState
          }) => {
            return (
              <Field
                size="medium"
                iconStartAdornment='codicon:mail'
                weight="bolder"
                sx={{ my: 2 }}
                placeholder=''
                fullWidth
                label='Email or ID Employed'
                isRequired
                error={fieldState.invalid}
                helperText={formLogin.formState.errors && formLogin.formState.errors[name]?.message}
                {...rest}
              >
                <Input type='text' variant='outlined' />
              </Field>
            );
          }}
        />

        <Controller
          name='password'
          control={formLogin.control}
          render={({
            field: {
              name,
              ...rest
            },
            fieldState
          }) => {
            return (
              <Field
                type="password"
                size="medium"
                weight="bolder"
                sx={{ my: 2 }}
                placeholder=''
                fullWidth
                label='Password'
                isRequired
                error={fieldState.invalid}
                helperText={formLogin.formState.errors && formLogin.formState.errors[name]?.message}
                iconStartAdornment='bxs:lock-alt'
                {...rest}
              >
                <Input variant='outlined' />
              </Field>
            );
          }}
        />
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='solid'
          sx={{ mb: 4, mt: 4, height: 48 }}
          disabled={formLogin.formState.isSubmitting || formLogin.formState.isSubmitSuccessful}
          content='textOnly'
          text='Login'
          loading={formLogin.formState.isSubmitting || formLogin.formState.isSubmitSuccessful}

        />
      </form>

      {/* Modal OTP Verification */}
      <ModalVerificationOtp
        password={formLogin.getValues('password')}
        valueQrCode={otpUrl}
        secret={secret}
        open={scanQRCode}
        setOpen={setScanQRCode}
        isVerifiedCode={isAccountVerified}
        email={formLogin.getValues('email')}
      />
      {/* End Modal OTP Verification */}

      {/* Modal Reset Password */}
      <Modal
        renderAction={false}
        isOpen={open}
        onClose={() => setOpen(false)}
        title='Create a new password'
        description='Please create your new password'
        position='left'
        icon='confirm'
        closeable={true}
        positiveLabel='Submit'
        negativeLabel='Cancel'
        color='primary'
        maxWidth='xs'
      >
        <FormResetPassword
          userId={userId as string}
          loginResponseData={loginResponseData}
          setOpen={setOpen}
        />
      </Modal>
      {/* End Modal Reset Password */}
    </>

  )
}

export default FormLogin
