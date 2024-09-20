export const getSize = (size: string, weight: string) => {
  switch (size) {
    case 'small':
      if (weight === 'bolder') return 'LABEL_SM_BOLDEST'
      return 'LABEL_SM_NORMAL'
    case 'medium':
      if (weight === 'bolder') return 'LABEL_MD_BOLDEST'
      return 'LABEL_MD_NORMAL'
    case 'large':
      if (weight === 'bolder') return 'LABEL_LG_BOLDEST'
      return 'LABEL_LG_NORMAL'
    default:
      if (weight === 'bolder') return 'LABEL_MD_BOLDEST'
      return 'LABEL_MD_NORMAL'
  }
}
