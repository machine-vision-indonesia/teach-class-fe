import { Box, Pagination as MuiPagination, Typography } from '@mui/material'
import { PropsPagination } from '../types/pagination.type'
import { PaginationItem } from '../styles/pagination.style'
import { MvTypography } from '@/components/atoms/mv-typography'

/**
 * Renders a custom pagination component based on the provided props.
 *
 * @param {PropsPagination} props - The props for the pagination component.
 * @return {JSX.Element} The custom pagination component.
 */
export const Pagination = ({ page, count, size, shape = 'square', width, limit, ...props }: PropsPagination) => {
  const valueData = Math.ceil(count / limit)
  const firstValue = 1 + (page - 1) * limit
  const lastValue = page * limit

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: width, alignItems: 'center' }}>
      <Box>
        <MvTypography
          typeSize={'PX'}
          size={size === 'small' ? 'HELPER_TEXT_SM' : size === 'medium' ? 'HELPER_TEXT_MD' : 'HELPER_TEXT_LG'}
          children={`Showing ${firstValue} to ${lastValue} of ${count} entries`}
        />
      </Box>
      <MuiPagination
        page={page}
        count={valueData}
        variant={'text'}
        size={size}
        shape={shape === 'square' ? 'rounded' : 'circular'}
        renderItem={item => (
          <PaginationItem {...item} variant={'text'} size={size} shape={shape === 'square' ? 'rounded' : 'circular'} />
        )}
        {...props}
      />
    </Box>
  )
}
