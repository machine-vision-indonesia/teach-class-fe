import { type ChipProps } from '@mui/material/Chip'
import React from 'react'
import { FetchParameters } from './Chip-Async.type'
import { UseQueryResult } from '@tanstack/react-query'
import { hexToRgba } from '@uiw/color-convert'
import CustomChip from 'src/@core/components/mui/chip'

export interface PropsMvChip {
  // color?: ChipProps['color'] | 'accent'
  // shape?: 'rounded' | 'circular'
  // variant?: ChipProps['variant'] | 'transparent'
  id?: string
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{ data: any }>
}

export const ChipAsync = ({
  // shape = 'circular',
  // variant = 'filled',
  dataFetchService,
  id
}: // ...props
  PropsMvChip & Omit<ChipProps, 'color' | 'variant'>) => {
  if (!id) return <div>No id found</div>
  const { data, error, isLoading } = dataFetchService({ id })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <CustomChip
      label={data?.data?.name ?? ''}
      // skin={'light'}
      sx={{
        color: `#${data?.data?.color}`,
        backgroundColor: `rgba(${hexToRgba(`#${data?.data?.color}`).r},${hexToRgba(`#${data?.data?.color}`).g},${hexToRgba(`#${data?.data?.color}`).b
          }, 0.4)`
      }}
    />
  )
}
