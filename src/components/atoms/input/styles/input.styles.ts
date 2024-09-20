export const removeArrow = {
  '& input[type=number]': {
    '-moz-appearance': 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  }
}

export const fieldSetRight = {
  '& fieldset': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  }
}
export const fieldSetLeft = {
  '& fieldset': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  }
}

export const fieldBothUnit = {
  '& fieldset': {
    borderRadius: 0,
    borderRight: 0,
    borderLeft: 0
  }
}
