export const getSize = (size: string) => {
  switch (size) {
    case 'small':
      return 12

    case 'medium':
      return 16

    default:
      return 12
  }
}

export const getBgColor = (theme: any, color: string) => {
  if (color === 'neutral') {
    return theme.colorToken.background.neutralInverted.normal
  } else if (color === 'neutralInverted') {
    return theme.colorToken.background.neutral.subtle
  } else {
    return theme.colorToken.background[color].normal
  }
}
