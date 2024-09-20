import React, { cloneElement, PropsWithChildren, ReactElement, useContext } from 'react'
import { FieldContext } from '../constants'

export const FieldInput: React.FC<PropsWithChildren<Record<string, unknown>>> = ({
  fieldError,
  fieldHelperText,
  onChange,
  children,
  ...inputProps
}) => {
  const { isRequired, error, helperText, ...otherProps } = useContext(FieldContext)

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, {
            isRequired,
            error: error || fieldError,
            helperText: helperText || fieldHelperText,
            onChange,
            ...otherProps,
            ...inputProps
          })
        }
        return child
      })}
    </>
  )
}
