import MuiButton from '@mui/material/Button'
import React from 'react'
import { Icon } from '@iconify/react'
import { MvTypography } from '../../mv-typography'
import { CircularProgress, useTheme } from '@mui/material'
import { ButtonProps } from '../types/button.types'
import { getColor, getSize, getIconSize, getVariantType } from '../utils/index'
import { buttonStyle as style } from '../styles/button.style'

/**
 * Renders a customizable button component.
 *
 * @param {Object} props - The properties for the button.
 * @param {string} [props.variant='solid'] - The style of the button. Can be 'solid', 'outlined', or 'text'.
 * @param {string} [props.content='textOnly'] - The content of the button. Can be 'iconText', 'textOnly', or 'iconOnly'.
 * @param {string} [props.icon] - The icon to display on the button.
 * @param {string} [props.text] - The text to display on the button.
 * @param {string} [props.color='primary'] - The color of the button.
 * @param {string} [props.size='medium'] - The size of the button.
 * @param {boolean} [props.loading] - Whether the button is in a loading state.
 * @param {Object} props.restProps - Additional properties to pass to the button component.
 * @return {JSX.Element} The rendered button component.
 */
export const Button = ({
  variant = 'solid',
  content = 'textOnly',
  icon,
  text,
  color = 'primary',
  size = 'medium',
  loading,
  fontWeight,
  iconSize,
  ...restProps
}: ButtonProps): React.JSX.Element => {
  const theme = useTheme()

  const variantType = getVariantType(variant)

  const renderIcon = () => (
    <Icon
      color={getColor(variant as string, color, theme, restProps)}
      width={iconSize ?? getIconSize(size)}
      icon={icon ?? ''}
    />
  )

  const renderText = () => (
    <MvTypography
      typeSize='PX'
      color={getColor(variant, color, theme, restProps)}
      size={getSize(size)}
      sx={{
        fontWeight: fontWeight ? fontWeight : undefined
      }}
    >
      {text}
    </MvTypography>
  )

  const buttonContent =
    content === 'iconText' ? (
      <>
        {renderIcon()}
        <span style={{ marginRight: 8 }} />
        {renderText()}
      </>
    ) : content === 'textOnly' ? (
      renderText()
    ) : (
      renderIcon()
    )

  return (
    <MuiButton
      sx={{
        ...style(variant),
        pointerEvents: loading ? 'none' : 'auto',
        cursor: loading ? 'not-allowed' : 'pointer'
      }}
      size={size}
      variant={variantType}
      color={color}
      {...restProps}
    >
      {loading ? <CircularProgress color='inherit' size={getIconSize(size)} /> : buttonContent}
    </MuiButton>
  )
}
