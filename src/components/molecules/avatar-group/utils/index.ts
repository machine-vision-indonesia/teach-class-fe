export const getFontSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 'LABEL_MD_NORMAL'
    case 'md':
      return 'LABEL_LG_NORMAL'
    case 'lg':
      return 'SUBTITLE_LG'
    default:
      return 'LABEL_LG_NORMAL'
  }
}
