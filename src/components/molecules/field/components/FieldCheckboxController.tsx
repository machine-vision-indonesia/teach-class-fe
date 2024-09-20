import React, { PropsWithChildren, useContext } from 'react'
import { Controller } from 'react-hook-form'
import { FieldInputControllerProps } from '../types/Field.types'
import { FieldContext } from '../constants'
import { FieldInput } from './FieldInput'

export const FieldCheckboxController: React.FC<PropsWithChildren<FieldInputControllerProps>> = ({
  controller,
  errors,
  children
}) => {
  const { isRequired, name, error, helperText, ...otherProps } = useContext(FieldContext)

  // masih otw
  return (
    <Controller
      name={name || ''}
      control={controller}
      render={({ field: { name, value, onChange, ...rest }, fieldState }) => {
        const fieldError = fieldState.invalid
        const fieldHelperText = errors && errors[name]?.message
        console.log('value ', value)
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.checked

          onChange(newValue)
        }

        return (
          <FieldInput fieldError={fieldError} fieldHelperText={fieldHelperText} onChange={handleChange} {...rest}>
            {children}
          </FieldInput>
        )
      }}
    />
  )
}
