import { Size } from '../types/Input.types'

export const handleUsingType = (type: string, showPassword: boolean) => {
  if (type === 'password') {
    return showPassword ? 'text' : 'password'
  }

  return type ? type : 'text'
}

export const handleInputStyle = (size: Size = 'medium') => {
  const styleType = {
    small: {
      fontSize: '12px',
      padding: '5.5px'
    },
    medium: {
      fontSize: '14px',
      padding: '8px'
    },
    large: {
      fontSize: '16px',
      padding: '10.5px'
    }
  }

  return styleType[size]
}

export const handleInputAdornmentStyle = (size: Size = 'medium') => {
  const styleType = {
    small: {
      padding: '15px 5px 15px 10px'
    },
    medium: {
      padding: '17px 5px 17px 10px'
    },
    large: {
      padding: '21px 5px 21px 10px'
    }
  }

  return styleType[size]
}
