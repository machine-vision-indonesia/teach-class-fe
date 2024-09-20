export const getSize = {
  fontSize: (variants?: 'small' | 'medium' | 'large') => {
    switch (variants) {
      case 'small':
        return '12px'
      case 'medium':
        return '14px'
      case 'large':
        return '16px'
      default:
        return '12px'
    }
  }
}
