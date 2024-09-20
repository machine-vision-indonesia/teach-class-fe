/** React Imports */
import React, { cloneElement, PropsWithChildren, ReactElement } from 'react'

/** MUI imports */
import { FormControl, FormHelperText } from '@mui/material'

/** Types imports */
import { FieldProps } from '../types/Field.types'

/** Constants imports */
import { FieldContext } from '../constants'

/** Components imports */
import { Label } from '@/components/atoms/label'
import { FieldLabel } from './FieldLabel'
import { FieldHelperText } from './FieldHelperText'
import { FieldInput } from './FieldInput'
import { FieldInputController } from './FieldInputController'
import { FieldSelectController } from './FieldSelectController'
import { FieldCheckboxController } from './FieldCheckboxController'

/**
 * The `Field` component is a reusable component designed to
 * wrap form field elements, providing additional props such as `isRequired`
 * and `error` to its children. It also allows rendering a label and helper text.
 *
 * @param {boolean} [props.isRequired=false] - Indicates if the field is required.
 * @param {boolean} [props.isCustomHelperText=false] - Indicates if custom helper text is used.
 * @param {boolean} props.error - The errors object provided by `react-hook-form`.
 * @param {string} [props.label] - The label text for the field.
 * @param {string} [props.name=''] - The name of the field, used for form control.
 * @param {string} [props.helperText] - The helper text to display for the field.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the Field component.
 * @param {object} [props.otherProps] - Other props to be passed to the children components.
 *
 * @returns {React.FC} The Field component.
 *
 * @example
 * // Usage example
 * <Field
 *   isRequired={true}
 *   label="Username"
 *   fieldName="username"
 *   fieldControl={control}
 *   errors={errors}
 * >
 *   <input />
 * </Field>
 */

export const Field: React.FC<PropsWithChildren<FieldProps>> & {
  Label: typeof FieldLabel
  HelperText: typeof FieldHelperText
  Input: typeof FieldInput
  InputController: typeof FieldInputController
  SelectController: typeof FieldSelectController
  CheckboxController: typeof FieldCheckboxController
} = ({ isRequired = false, isCustomHelperText = false, label, name, error, helperText, children, ...otherProps }) => {
  const contextValue = { isRequired, isCustomHelperText, label, name, error, helperText, ...otherProps }

  const renderChildrenWithProps = (children: React.ReactNode) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return cloneElement(child as ReactElement<any>, {
          isRequired,
          error,
          helperText,
          ...otherProps
        })
      }
      return child
    })
  }

  return (
    <FieldContext.Provider value={contextValue}>
      <FormControl error={error} fullWidth>
        {label && (
          <Label isRequired={isRequired} weight={otherProps.weight || 'bolder'}>
            {label}
          </Label>
        )}
        {renderChildrenWithProps(children)}
        {isCustomHelperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </FieldContext.Provider>
  )
}

// Attach compound components
Field.Label = FieldLabel
Field.HelperText = FieldHelperText
Field.Input = FieldInput
Field.InputController = FieldInputController
Field.SelectController = FieldSelectController
Field.CheckboxController = FieldCheckboxController
