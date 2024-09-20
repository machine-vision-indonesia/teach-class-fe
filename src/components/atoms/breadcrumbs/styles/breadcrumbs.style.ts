export const style = (theme: any) => ({
  color: theme.palette.primary.main + '!important',
  '&:hover': {
    color: theme.palette.blueMv['500'] + '!important'
  },
  '&:active': {
    color: theme.palette.blueMv['700'] + '!important'
  }
})
