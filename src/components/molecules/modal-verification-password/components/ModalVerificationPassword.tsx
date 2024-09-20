// React and Hooks
import React, { FC, useEffect } from 'react';

// MUI Components
import { Box, useTheme } from '@mui/material';

// External Libraries
import { Icon } from '@iconify/react/dist/iconify.js';
import { Controller, useForm } from 'react-hook-form';

// Components
import { Modal } from '@/components/molecules';
import { Button } from 'src/components/atoms';
import { Input } from '@/components/atoms/input';
import { Field } from '../../field';
import { MvTypography } from '@/components/atoms/mv-typography';

// Types
import { IModalVerification, IPropsPassword, Schema } from '../types/ModalVerificationPassword.types';


export const ModalVerificationPassword: FC<IModalVerification> = ({
  open,
  setOpen,
  onSubmit,
  passwordError,
  isLoading
}) => {
  const theme = useTheme()
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IPropsPassword>({ defaultValues: { password: '' } })

  useEffect(() => {
    if (passwordError) {
      if (passwordError.length > 0) {
        setError('password', { message: passwordError })
      }
    }
  }, [passwordError, onSubmit])

  useEffect(() => {
    if (!open) {
      reset()
      setValue('password', '')
    }
  }, [open])

  const onSubmitPassword = async (data: Schema) => {
    if (onSubmit) {
      onSubmit(data?.password)
    } else {
      setOpen(false)
    }
  }
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(prev => !prev)}
      size='medium'
      position='center'
      renderAction={false}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', marginTop: 10, width: '80%' }}>
          <Icon
            icon="mdi:warning-circle-outline"
            fontSize='72px'
            color={theme.colorToken.icon.warning.normal}
          />
          <MvTypography size='LABEL_MD_BOLDEST' typeSize='PX' mt={3}>
            Enter Password
          </MvTypography>
          <MvTypography size="HELPER_TEXT_MD" typeSize='PX' mt={3} color={theme.colorToken.text.neutralInverted.normal}>
            Please enter password first!
          </MvTypography>

          <Box sx={{ mt: 5, width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmitPassword)} autoComplete='off'>
              <Controller name='password' control={control} render={({
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
                    helperText={errors && errors[name]?.message}
                    iconStartAdornment='bxs:lock-alt'
                    {...rest}
                  >
                    <Input variant='outlined' />
                  </Field>
                );
              }} />
              <Box sx={{ my: 4 }}>
                <Button
                  variant='outlined'
                  sx={{ mr: 2 }}
                  onClick={() => {
                    setOpen(false)
                    reset()
                    setError('password', {
                      message: ''
                    })
                  }}
                  content='textOnly'
                  text='Cancel'
                />
                <Button
                  disabled={isLoading}
                  variant="contained"
                  type="submit"
                  content='textOnly' text='Submit'
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
