export const getSize = {
  boxSize: (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return '38px'
      case 'medium':
        return '40px'
      case 'large':
        return '55px'
      default:
        return '40px'
    }
  },
  textFieldSize: (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'medium':
        return 'small'
      case 'large':
        return 'medium'
      default:
        return 'small'
    }
  },
  previewSize: (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'medium':
        return 'small'
      case 'large':
        return 'medium'
      default:
        return 'small'
    }
  }
}
