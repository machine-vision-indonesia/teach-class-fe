export const bottom = {
  position: 'relative',
  mt: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 12,
    height: 12,
    top: -6,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)'
  }
}

export const bottomSm = {
  position: 'relative',
  mt: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 10,
    top: -5,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)'
  }
}

export const top = {
  position: 'relative',
  mb: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: -6,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)'
  }
}

export const topSm = {
  position: 'relative',
  mb: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: -5,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)'
  }
}

export const left = {
  position: 'relative',
  mr: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 12,
    height: 12,
    right: -6,
    transform: 'rotate(45deg)',
    top: 'calc(50% - 6px)'
  }
}

export const leftSm = {
  position: 'relative',
  mr: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 10,
    right: -4,
    transform: 'rotate(45deg)',
    top: 'calc(50% - 5px)'
  }
}

export const right = {
  position: 'relative',
  ml: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 12,
    height: 12,
    left: -6,
    transform: 'rotate(45deg)',
    top: 'calc(50% - 6px)'
  }
}

export const rightSm = {
  position: 'relative',
  ml: '10px',
  '&::before': {
    backgroundColor: (thm: any) => thm.palette.text.secondary,
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 10,
    left: -4,
    transform: 'rotate(45deg)',
    top: 'calc(50% - 5px)'
  }
}
