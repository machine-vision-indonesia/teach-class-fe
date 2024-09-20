import { Box, Stack } from '@mui/material'
import { Icon } from '@iconify/react'
import { StyledLabelProps } from '../types/styledLabel.types'

export const StyledLabel = ({
  icon,
  label,
  variant,
  onAddItem,
  onDeleteItem,
  onEditItem,
  onCancelEdit,
  children
}: StyledLabelProps) => {
  return (
    <Stack
      display='flex'
      flexDirection='row'
      alignItems='center'
      width='100%'
      height='100%'
      justifyContent='space-between'
      padding={variant === 'line' ? '5px' : undefined}
    >
      <Box sx={{ display: 'flex', height: '25px', alignItems: 'center' }}>
        {icon && <Icon icon={icon} fontSize={'24px'} />}
        <Box sx={{ marginLeft: 1 }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {label}{' '}
            <span style={{ fontSize: '14px', fontStyle: 'italic', color: '#A9A9AC', fontWeight: 'bold' }}>
              {' '}
              - {label}
            </span>
          </span>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '30%', justifyContent: 'end' }}>{children}</Box>
    </Stack>
  )
}
