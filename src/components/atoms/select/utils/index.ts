export const getSize = {
  fontSize: (size?: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return '12px'
      case 'medium':
        return '14px'
      case 'large':
        return '16px'
      default:
        return '12px'
    }
  },
  inputSize: (size?: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return '28px'
      case 'medium':
        return '36px'
      case 'large':
        return '44px'
      default:
        return '28px'
    }
  },

  chipSize: (size?: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return '20px'
      case 'medium':
        return '25px'
      case 'large':
        return '30px'
      default:
        return '20px'
    }
  },

  iconSize: (size?: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return '16px'
      case 'medium':
        return '20px'
      case 'large':
        return '24px'
      default:
        return '16px'
    }
  }
}
