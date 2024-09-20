import { Box, FormControl, Stack, Typography } from '@mui/material'
import React from 'react'
import { DropdownMultiple } from '../table-async/DropdownMultiple'
import { DropdownGroupFilter } from './ComponentAsync.type'

const FormFilter = ({ label, groupFilter }: { label: string; groupFilter: DropdownGroupFilter[] }) => {
  return (
    <>
      <Typography mt='.5rem' variant='h4'>
        Fill the form of {label}
      </Typography>
      <Box sx={{ width: '464px' }}>
        {groupFilter.map((filter, index) => {
          return (
            <Stack
              key={index}
              direction='column'
              style={{ marginBottom: '24px', marginTop: '1.5rem', alignItems: 'center' }}
            >
              <FormControl fullWidth>
                <Typography variant='labelMd'>{filter.name}</Typography>
                <FormControl fullWidth>
                  <DropdownMultiple
                    name={filter.name}
                    field={filter.field}
                    labelKey={filter.labelKey}
                    dataFetchService={filter.dataFetchService}
                  />
                </FormControl>
              </FormControl>
            </Stack>
          )
        })}
      </Box>
    </>
  )
}

export default FormFilter
