import React from 'react'
import { Button } from '../../button'
import RoundedButtonProps from '../types/roundedButton.types'
import { getButtonSize, getSize } from '../utils'
import { roundedButonStyle } from '../styles/roundedButton.styles'

/**
 * Renders a rounded button with specified style, size, and loading state.
 *
 * @param {RoundedButtonProps} style - The style of the button.
 * @param {string} [size='medium'] - The size of the button.
 * @param {boolean} loading - The loading state of the button.
 * @return {JSX.Element} The rounded button component.
 */
export const RoundedButton = ({
  style = 'solid',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick = () => {}
}: RoundedButtonProps) => {
  return (
    <Button
      sx={{
        ...roundedButonStyle(getButtonSize(size))
      }}
      disabled={disabled}
      size='medium'
      onClick={onClick}
      variant={style}
      icon='ic:baseline-plus'
      content='iconOnly'
      color='primary'
      iconSize={getSize(size)}
      loading={loading}
    />
  )
}
