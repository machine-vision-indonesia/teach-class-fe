import React, { PropsWithChildren, useContext } from 'react'
import { Label } from '@/components/atoms/label'
import { FieldLabelProps } from '../types/Field.types'
import { FieldContext } from '../constants'

export const FieldLabel: React.FC<PropsWithChildren<FieldLabelProps>> = ({ children, fontWeight }) => {
  const { isRequired, ...otherProps } = useContext(FieldContext)
  return (
    <Label isRequired={isRequired} weight={fontWeight || 'bolder'}>
      {children}
    </Label>
  )
}
