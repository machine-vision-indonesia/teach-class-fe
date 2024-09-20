import * as React from 'react'
import LabelProps from '../types/Label.types'
import { MvTypography } from '../../mv-typography'
import { getSize } from '../utils'

/**
 * Renders a label component with optional asterisk indicating required field.
 *
 * @param {Object} props - The properties for the label component.
 * @param {boolean} [props.isRequired=true] - Indicates if the field is required.
 * @param {string} [props.size='medium'] - The size of the label.
 * @param {string} [props.weight='normal'] - The weight of the label.
 * @param {ReactNode} props.children - The content of the label.
 * @param {...any} props.otherProps - Additional properties to be spread on the MvTypography component.
 * @returns {JSX.Element} The rendered label component.
 */
export const Label: React.FC<LabelProps> = ({
  isRequired = false,
  size = 'medium',
  weight = 'normal',
  children,
  typeSize = 'PX',
  ...otherProps
}: LabelProps) => {
  return (
    <MvTypography {...otherProps} typeSize={typeSize} size={getSize(size, weight)}>
      {children} {isRequired && <span style={{ color: 'red' }}>*</span>}
    </MvTypography>
  )
}
