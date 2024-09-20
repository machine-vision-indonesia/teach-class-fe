import MuiPagination, { type PaginationProps } from '@mui/material/Pagination'

export const Pagination = (props: PaginationProps) => {
  const colorUsed = props.color ?? 'primary'

  return (
    <MuiPagination
      sx={{
        '& .Mui-selected': {
          color: 'white !important'
        }
      }}
      color={colorUsed}
      {...props}
    />
  )
}
