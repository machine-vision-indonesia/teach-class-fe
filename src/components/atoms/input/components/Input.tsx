/** React Imports */
import { useState } from 'react'

/** MUI Imports */
import TextField from '@mui/material/TextField'
import { Box, IconButton, InputAdornment, useTheme } from '@mui/material'

/** Iconify imports */
import { Icon } from '@iconify/react'

/** Types/Interface imports */
import ComponentInputProps from '../types/Input.types'

/** Utils imports */
import { handleInputAdornmentStyle, handleInputStyle, handleUsingType } from '../utils'
import { MvTypography } from '../../mv-typography'
import { removeArrow } from '../styles/input.styles'

/**
 * @param {object} props - Other component props
 * @param {string} [props.id] - The id of the input field
 * @param {string} [props.variant] - The variant of the input field
 * @param {string} [props.color] - The color of the input field
 * @param {string} [props.size] - The size of the input field
 * @param {string} [props.type] - The type of the input field (e.g., text, password)
 * @param {boolean} [props.error] - Whether the input field has an error
 * @param {string} [props.helperText] - The helper text to display when there is an error
 * @param {string} [props.placeholder] - The placeholder text for the input field
 * @param {object} [props.InputProps] - Props to pass to the input component
 * @param {object} [props.FormHelperTextProps] - Props to pass to the helper text component
 *
 * @returns {React.FC} The Input component
 */
export const Input: React.FC<ComponentInputProps> = ({
  id = 'field-id',
  variant = 'outlined',
  color = 'primary',
  size = 'medium',
  type = 'text',
  error = false,
  helperText = 'Error Message.',
  placeholder = 'Input value here...',
  fullWidth = false,
  width,
  iconStartAdornment,
  iconEndAdornment,
  leftUnit,
  rightUnit,
  numberNoArrow,
  ...props
}: ComponentInputProps) => {
  /** States */
  const [showPassword, setShowPassword] = useState(false)

  const theme = useTheme()

  /** Functions */
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const iconSize = size === 'large' ? '1.75rem' : size === 'medium' ? '1.5rem' : '1.125rem'

  const adornmentMap: Record<string, JSX.Element | null> = {
    password: (
      <InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge='end'
          size={size ? size : 'medium'}
        >
          {showPassword ? <Icon icon='iconamoon:eye-off-light' /> : <Icon icon='mynaui:eye' />}
        </IconButton>
      </InputAdornment>
    ),
    iconStart: iconStartAdornment ? (
      <InputAdornment position='start'>
        <Icon fontSize={iconSize} icon={iconStartAdornment} />
      </InputAdornment>
    ) : null,
    iconEnd: iconEndAdornment ? (
      <InputAdornment position='end'>
        <Icon fontSize={iconSize} icon={iconEndAdornment} />
      </InputAdornment>
    ) : null,
    unitStart: leftUnit ? (
      <InputAdornment
        position='start'
        sx={{
          padding: handleInputAdornmentStyle(size)?.padding,
          marginLeft: '-13px',
          marginRight: '0px',
          backgroundColor: theme => theme.colorToken.background.neutral.subtlest,
          borderTopLeftRadius: theme => theme.shape.borderRadius + 'px',
          borderBottomLeftRadius: theme => theme.shape.borderRadius + 'px'
        }}
      >
        <MvTypography size='LABEL_SM_NORMAL' typeSize='PX' color={theme.colorToken.text.neutral.subtle}>
          {leftUnit}
        </MvTypography>
      </InputAdornment>
    ) : null,
    unitEnd: rightUnit ? (
      <Box
        sx={{
          bgcolor: theme.colorToken.background.neutral.subtlest
        }}
      >
        <InputAdornment
          position='end'
          sx={{
            padding: handleInputAdornmentStyle(size)?.padding,
            marginLeft: '0px',
            marginRight: '-13px',
            backgroundColor: theme => theme.colorToken.background.neutral.subtlest,
            borderTopRightRadius: theme => theme.shape.borderRadius + 'px',
            borderBottomRightRadius: theme => theme.shape.borderRadius + 'px'
          }}
        >
          <MvTypography size='LABEL_SM_NORMAL' typeSize='PX' color={theme.colorToken.text.neutral.subtle}>
            {rightUnit}
          </MvTypography>
        </InputAdornment>
      </Box>
    ) : null
  }

  const renderStartAdornment = (iconStartAdornment?: string, leftUnit?: string) => {
    return iconStartAdornment ? adornmentMap.iconStart : adornmentMap.unitStart
  }

  const renderEndAdornment = (type?: string, iconEndAdornment?: string, rightUnit?: string) => {
    if (type === 'password') {
      return adornmentMap.password
    }

    return iconEndAdornment ? adornmentMap.iconEnd : adornmentMap.unitEnd
  }

  return (
    <TextField
      id={id}
      variant={variant}
      size={size}
      placeholder={placeholder}
      error={error}
      helperText={error ? helperText : ''}
      type={handleUsingType(type, showPassword)}
      FormHelperTextProps={{
        sx: {
          color: 'red',
          marginLeft: '0'
        }
      }}
      InputProps={{
        startAdornment: renderStartAdornment(iconStartAdornment, leftUnit),
        endAdornment: renderEndAdornment(type, iconEndAdornment, rightUnit)
      }}
      sx={[
        {
          width: width ? width : fullWidth ? '100%' : '200px',
          '& .MuiInputBase-input': {
            fontSize: handleInputStyle(size)?.fontSize,
            padding: handleInputStyle(size)?.padding,
            '::placeholder': {
              color: theme.colorToken.text.neutral.subtlest
            }
          }
        },
        numberNoArrow ? removeArrow : {}
      ]}
      {...props}
    />
  )
}
